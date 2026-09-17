require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const Job=require("./models/job")
const path=require("path");
const app =express();

app.use(express.static(path.join(__dirname,"Frontend")));

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB connected successfully");
    })
    .catch((error)=>{
        console.error("MongoDB connection failed:",error);
    });


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","index.html"));
})
app.get("/api/jobs",async(req,res)=>{
    try{ 
    const jobs =await Job.find();
    res.json(jobs);
    }
    catch(error){
        console.error("Error fetching jobs:",error);
        res.status(500).json({message: "Faileb to fetch jobs."})
    }
})
app.post("/api/jobs", async(req,res)=>{
    try{
        const jobs = new Job(req.body);
        const savedJob=await job.save();

        res.status(201).json(savedJob);
    }
    catch(error){
        console.error("error fetching jobs:",error);
        req.status(500).json({message:"Failed to fetch bs"});
    }
});
app.get("/api/jobs/:id",async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id);
    if(!job){
        return res.status(404).json({
            message:"Job not found"
        });
    }
    
    res.json(job);
}catch(error){
        console.error("Error fetching job:",error);
        res.status(500).json({
            message:"Failed to fetch job"
        });
    }
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000.")
});