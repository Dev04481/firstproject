console.log("Job Portal Javascript is connected.");

async function getjobs() {
  try{
    const response=await fetch("/api/jobs");

    const jobs=await response.json();

    console.log(jobs);
  }
  catch(error){
    console.log("Errorfetching jobs:",error);
  }  
}
getjobs();