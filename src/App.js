import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState(null);
  // https://ui.dev/api/courses/react-query/labels
  const labelsQuery = useQuery(["labels"], () =>
    fetch("https://ui.dev/api/courses/react-query/labels").then((res) =>
      res.json()
    )
  );
  const issueQuery = useQuery(
    ["issues", { selected }],
    () =>
      fetch(
        `https://ui.dev/api/courses/react-query/issues?labels[]=${selected}`
      ).then((res) => res.json()),
    { enabled: !!selected }
  );

  if (labelsQuery.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        {labelsQuery.data.map((label) => (
          <button
            style={{
              backgroundColor: `${label.color}`,
              margin: "10px",
              fontWeight: label.id === selected ? "bolder" : "normal"
            }}
            onClick={() => setSelected(label.id)}
          >
            {label.name}
          </button>
        ))}
      </div>
      {issueQuery.status === "loading" &&
      issueQuery.fetchStatus === "idle" ? null : (
        <>
          {issueQuery.isLoading ? (
            <p>loading..</p>
          ) : (
            <ul>
              {issueQuery.data.map((issue) => (
                <li> {issue.title}</li>
              ))}
            </ul>
          )}
        </>
      )}
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
