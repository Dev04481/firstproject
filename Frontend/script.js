console.log("Job Portal Javascript is connected.");

async function getjobs() {
  try{
    const response=await fetch("/api/jobs");

    const jobs=await response.json();

    console.log(jobs);

    //Find jbs container in jobs.html
    const jobsContainer= document.getElementById("jobsContainer");

    //if jobs container does'nt exist,
    //stop thee function
    if(!jobsContainer){
        return;
    }
    
    //Clear existing content
    jobsContainer.innerHTML="";

    //create a card for every job:-
    jobs.forEach((job) => {
        const jobcard=
                       document.createElement("div");
                jobcard.classList.add("job-card");
                jobcard.innerHTML=`
                <div class="comany-icon">
                    <i class="fa-solid fa-briefcase"></i>
                </div>
                
                <div class="job-info">

                    <span class="job-type">
                        ${job.type}
                    </span>


                    <h3>
                        ${job.title}
                    </h3>


                    <p class="company-name">

                        <i class="fa-solid fa-building"></i>

                        ${job.company}

                    </p>


                    <div class="job-details">

                        <span>

                            <i class="fa-solid fa-location-dot"></i>

                            ${job.location}

                        </span>


                        <span>

                            <i class="fa-solid fa-indian-rupee-sign"></i>

                            ${job.salary}

                        </span>

                    </div>


                    <div class="job-skills">

                        ${job.skills.map((skill) => `
                            <span>${skill}</span>
                        `).join("")}

                    </div>

                </div>


                <button class="view-job"
                onclick="ViewJob(${job.id})">

                    View Job

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            `;

            jobsContainer.appendChild(jobcard);                      
                
    });

}
  catch(error){
    console.error("Error fetching jobs:",error);
  }  
}
getjobs();