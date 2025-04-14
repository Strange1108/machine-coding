import { useState, useEffect, useCallback } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, loading, error, success
  const [sortAsc, setSortAsc] = useState(true);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchUsers = useCallback(async () => {
    if (!debouncedQuery) return;
    setStatus("loading");

    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${debouncedQuery}`
      );
      const data = await res.json();

      if (data.items?.length > 0) {
        setUsers(data.items);
        setStatus("success");
      } else {
        setUsers([]);
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }, [debouncedQuery]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedQuery, fetchUsers]);

  const sortedUsers = [...users].sort((a, b) =>
    sortAsc
      ? a.login.localeCompare(b.login)
      : b.login.localeCompare(a.login)
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GitHub username..."
          className="w-full p-3 rounded-md border border-gray-300 shadow-sm"
        />
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600 text-sm">
            {status === "idle" && "Search for a user"}
            {status === "loading" && "Loading..."}
            {status === "error" && "User not found"}
          </p>
          <button
            onClick={() => setSortAsc((prev) => !prev)}
            className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sort {sortAsc ? "↓" : "↑"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {status === "success" &&
          sortedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h3 className="mt-3 text-center font-semibold text-lg">
                {user.login}
              </h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-blue-500 mt-2 hover:underline"
              >
                View Profile
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
