import { Router } from "express";
const router = Router();

router.get("/", (req,res)=>{
    res.render("careers.ejs");
})

export default router