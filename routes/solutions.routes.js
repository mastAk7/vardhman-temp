import { Router } from "express";
const router = Router();

router.get("/", (req,res)=>{
    res.render("solutions.ejs");
})

export default router