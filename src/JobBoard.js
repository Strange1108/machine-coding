import React, { useState, useEffect } from 'react';

const JobBoard = () => {
  const [jobIds, setJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchJobIds = async () => {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
      const data = await response.json();
      setJobIds(data);
    };
    fetchJobIds();
  }, []);

  useEffect(() => {

    const fetchJobDetails = async () => {
      setIsLoading(true);

      const jobDetailsPromises = jobIds.slice((page - 1) * 6, page * 6).map(async (id) => {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return await response.json();
      });

      const jobDetails = await Promise.all(jobDetailsPromises);
      
      if (page === 1) {
        setJobs(jobDetails);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...jobDetails]);
      }

      setIsLoading(false);
    };
    
    if (jobIds.length > 0) {
      fetchJobDetails();
    }
  }, [jobIds, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center text-orange-500">Hacker News Jobs Board</h1>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              {job.url ? (
                <a href={job.url} target="_blank" rel="noreferrer" className="text-orange-600 font-bold hover:underline">
                  {job.title}
                </a>
              ) : (
                <div className="text-orange-600 font-bold">{job.title}</div>
              )}
              <p className="text-gray-600 mt-2">Posted by {job.by} on {formatTimestamp(job.time)}</p>
            </div>
          ))}
        </div>
        {isLoading ? (
          <div className="flex justify-center mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg block mx-auto mt-6"
            onClick={handleLoadMore}
            disabled={jobs.length === 0 || jobs.length % 6 !== 0}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default JobBoard;