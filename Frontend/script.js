console.log("Job Portal Javascript is connected.");

function viewJob(jobId){
    window.location.href=
    `job-details.html?id=${jobId}`;
}

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
                onclick="viewJob(${job.id})">

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


//GET SINGLE JOB DETAILS 

async function getJobDetails() {

    const jobDetails =
        document.getElementById("jobDetails");


    // If we are not on job-details.html
    if (!jobDetails) {
        return;
    }

    // Get job ID from URL
    const params =
        new URLSearchParams(
            window.location.search
        );

    const jobId =
        params.get("id");

    // Check if ID exists
    if (!jobId) {

        jobDetails.innerHTML = `
            <div class="job-error">

                <h2>Job Not Found</h2>

                <p>
                    No job ID was provided.
                </p>

                <a href="jobs.html">
                    Back to Jobs
                </a>

            </div>
        `;

        return;
    }

    try {

        // Call API
        const response =
            await fetch(`/api/jobs/${jobId}`);

        // Check API response
        if (!response.ok) {

            throw new Error("Job not found");}

        // Convert response to JSON
        const job =
            await response.json();

        console.log("Selected job:", job);
        console.log("Skills:",job.skills);
        console.log("Requirements:",job.requirements)

        // Display job details
        jobDetails.innerHTML = `

        <div class="job-details-card">

        <div class="job-details-header">

        <div class="company-icon large">

        <i class="fa-solid fa-briefcase"></i>

        </div>

        <div>

        <span class="job-type">
            ${job.type}
        </span>

        <h2>
            ${job.title}
        </h2>

        <p>

        <i class="fa-solid fa-building"></i>

            ${job.company}

        </p>

        </div>

        </div>

        <div class="job-details-info">
        <span>
        <i class="fa-solid fa-location-dot"></i>
            ${job.location}
         </span>

        <span>

        <i class="fa-solid fa-indian-rupee-sign"></i>
            ${job.salary}
        </span>

        </div>

        <hr>

        <h3>
            Job Description
        </h3>

        <p class="job-description">
            ${job.description}
        </p>

        <h3>
            Required Skills
        </h3>

        <div class="job-skills">

            ${(job.skills || []).map((skill) => `

        <span>
            ${skill}
        </span>
            `).join("")}
        </div>

        <h3>
            Requirements
        </h3>

        <ul class="job-requirements">
            ${(job.requirements || [] ).map((requirement) => `

        <li>
            ${requirement}
        </li>
            `).join("")}

        </ul>


        <button
            class="apply-btn"
            onclick="applyJob(${job.id})">
            Apply Now
        <i class="fa-solid fa-arrow-right"></i>
        </button>
        <br><br>
         <a
            href="jobs.html"
             class="back-to-jobs">
         <i class="fa-solid fa-arrow-left"></i>
            Back to Jobs
         </a>
        </div> `;
    }

    catch (error) {
        console.error(
            "Error fetching job details:",
            error
        );

 // Show error ONLY if API request fails
    jobDetails.innerHTML = `

        <div class="job-error">
            <h2>
               Job Not Found
            </h2>
            <p>
                The job you're looking for doesn't exist.
            </p>
            <a href="jobs.html">
                Back to Jobs
            </a>
            </div>`;
    }
}
function applyjob(jobId){
    window.location.href=
    `login.html?apply=${jobId}`;
}

getjobs();
getJobDetails();