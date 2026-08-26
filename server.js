const express=require("express");
const path=require("path");
const app =express();

app.use(express.static(path.join(__dirname,"Frontend")));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"Frontend","index.html"));
})

app.get("/api/jobs",(req,res)=>{
    const jobs=[
        {
            id:1,
            title:"frontend Developer",
            company:"Tech solution",
            location:"Delhi",
            type:"Full time",
            salary:"5-8LPA",
            skills:["HTML,CSS,JAVASCRIPT"]
        },
        {
            id:2,
            title:"Backend Developer",
            company:"CodeLabs",
            location:"Pune",
            type:"Full time",
            salary:"5-10LPA",
            skills:["HTML","CSS","JAVASCRIPT","Node.js","Express","MongoDB"]
        },
        {
            id:3,
            title:"Full Stack Developer",
            company:"Webworks",
            location:"Noida",
            type:"Full time",
            salary:"7-10LPA",
            skills:["HTML","CSS","JAVASCRIPT","Node.js","Express","MongoDB"]
        }
    ];
    res.json(jobs);
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000.")
});