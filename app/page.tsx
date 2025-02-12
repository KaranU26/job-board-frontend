// import API from "@/lib/api";

async function fetchJobs() {
  try {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL); // Debug log
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.log('Response status:', res.status); // Debug log
      throw new Error(`Failed to fetch jobs: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return []; // Return empty array as fallback
  }
}

export default async function Home() {
  const jobs = await fetchJobs();

  return (
    <main className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found. Please check if your API server is running.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job: any) => (
            <div key={job.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-500">{job.company} - {job.location}</p>
              <p className="font-bold">${job.salary.toLocaleString()} / year</p>
              <p className="text-sm text-gray-700">Type: {job.job_type}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
