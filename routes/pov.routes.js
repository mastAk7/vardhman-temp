import express from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { fileURLToPath } from 'url';

// For __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// File paths
const POV_DATA_FILE = path.join(__dirname, '../data/pov.json');
const ADMIN_PASSWORD_FILE = path.join(__dirname, '../data/admin.json');
const UPLOADS_DIR = path.join(__dirname, '../public/uploads/pov');

// Ensure directories exist
if (!fs.existsSync(path.dirname(POV_DATA_FILE))) {
    fs.mkdirSync(path.dirname(POV_DATA_FILE), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'), false);
        }
    }
});

// Helper functions
const readPOVData = () => {
    try {
        if (fs.existsSync(POV_DATA_FILE)) {
            const data = fs.readFileSync(POV_DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Error reading POV data:', error);
        return [];
    }
};

const writePOVData = (data) => {
    try {
        fs.writeFileSync(POV_DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing POV data:', error);
        return false;
    }
};

const readAdminData = () => {
    try {
        if (fs.existsSync(ADMIN_PASSWORD_FILE)) {
            const data = fs.readFileSync(ADMIN_PASSWORD_FILE, 'utf8');
            return JSON.parse(data);
        }
        // Default admin password: "admin123" (hashed)
        const defaultPassword = bcrypt.hashSync('admin123', 10);
        const defaultData = { password: defaultPassword };
        fs.writeFileSync(ADMIN_PASSWORD_FILE, JSON.stringify(defaultData, null, 2));
        return defaultData;
    } catch (error) {
        console.error('Error reading admin data:', error);
        return null;
    }
};

// Middleware to check admin authentication
const requireAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.redirect('/pov/admin/login');
    }
};

// Public Routes

// Display all POV posts
router.get('/', (req, res) => {
    const povPosts = readPOVData();
    res.render('pov/index', { povPosts, title: 'Point of View' });
});

// Get single POV post (for popup modal)
router.get('/post/:id', (req, res) => {
    const povPosts = readPOVData();
    const post = povPosts.find(p => p.id === req.params.id);
    
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json(post);
});

// Download PDF
router.get('/download/:id', (req, res) => {
    const povPosts = readPOVData();
    const post = povPosts.find(p => p.id === req.params.id);
    
    if (!post || !post.pdfFile) {
        return res.status(404).json({ error: 'PDF not found' });
    }
    
    const filePath = path.join(UPLOADS_DIR, post.pdfFile);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'PDF file not found' });
    }
    
    res.download(filePath, post.title + '.pdf');
});

// Admin Routes

// Admin login page
router.get('/admin/login', (req, res) => {
    res.render('pov/admin/login', { error: null, title: 'Admin Login' });
});

// Admin login process
router.post('/admin/login', (req, res) => {
    const { password } = req.body;
    const adminData = readAdminData();
    
    if (!adminData) {
        return res.render('pov/admin/login', { error: 'System error', title: 'Admin Login' });
    }
    
    if (bcrypt.compareSync(password, adminData.password)) {
        req.session.isAdmin = true;
        res.redirect('/pov/admin');
    } else {
        res.render('pov/admin/login', { error: 'Invalid password', title: 'Admin Login' });
    }
});

// Admin dashboard
router.get('/admin', requireAdmin, (req, res) => {
    const povPosts = readPOVData();
    res.render('pov/admin/dashboard', { povPosts, title: 'Admin Dashboard' });
});

// Admin logout
router.post('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Add new post page
router.get('/admin/add', requireAdmin, (req, res) => {
    res.render('pov/admin/add', { title: 'Add New Post' });
});

// Add new post
router.post('/admin/add', requireAdmin, upload.single('pdf'), (req, res) => {
    const { title, description, content, author } = req.body;
    const povPosts = readPOVData();
    
    const newPost = {
        id: Date.now().toString(),
        title,
        description,
        content,
        author,
        createdAt: new Date().toISOString(),
        pdfFile: req.file ? req.file.filename : null
    };
    
    povPosts.push(newPost);
    
    if (writePOVData(povPosts)) {
        res.redirect('/pov/admin');
    } else {
        res.render('pov/admin/add', { error: 'Error saving post', title: 'Add New Post' });
    }
});

// Edit post page
router.get('/admin/edit/:id', requireAdmin, (req, res) => {
    const povPosts = readPOVData();
    const post = povPosts.find(p => p.id === req.params.id);
    
    if (!post) {
        return res.redirect('/pov/admin');
    }
    
    res.render('pov/admin/edit', { post, title: 'Edit Post' });
});

// Update post
router.post('/admin/edit/:id', requireAdmin, upload.single('pdf'), (req, res) => {
    const { title, description, content, author } = req.body;
    const povPosts = readPOVData();
    const postIndex = povPosts.findIndex(p => p.id === req.params.id);
    
    if (postIndex === -1) {
        return res.redirect('/pov/admin');
    }
    
    const post = povPosts[postIndex];
    
    // Update post data
    post.title = title;
    post.description = description;
    post.content = content;
    post.author = author;
    post.updatedAt = new Date().toISOString();
    
    // Handle PDF file update
    if (req.file) {
        // Delete old PDF if exists
        if (post.pdfFile) {
            const oldFilePath = path.join(UPLOADS_DIR, post.pdfFile);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);
            }
        }
        post.pdfFile = req.file.filename;
    }
    
    if (writePOVData(povPosts)) {
        res.redirect('/pov/admin');
    } else {
        res.render('pov/admin/edit', { post, error: 'Error updating post', title: 'Edit Post' });
    }
});

// Delete post
router.post('/admin/delete/:id', requireAdmin, (req, res) => {
    const povPosts = readPOVData();
    const postIndex = povPosts.findIndex(p => p.id === req.params.id);
    
    if (postIndex !== -1) {
        const post = povPosts[postIndex];
        
        // Delete PDF file if exists
        if (post.pdfFile) {
            const filePath = path.join(UPLOADS_DIR, post.pdfFile);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        
        povPosts.splice(postIndex, 1);
        writePOVData(povPosts);
    }
    
    res.redirect('/pov/admin');
});

export default router;