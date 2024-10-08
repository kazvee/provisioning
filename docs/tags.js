import React from "react";
import tags from "./tags.yml";
import { useDocsData } from "@docusaurus/plugin-content-docs/client";

const TagsPage = () => {
  const { allDocs } = useDocsData();

  const postsByTag = allDocs.reduce((acc, post) => {
    post.metadata.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(post);
    });
    return acc;
  }, {});

  return (
    <div>
      <h1>Recipe Tags</h1>
      {Object.keys(tags).map((tagKey) => (
        <div key={tagKey}>
          <h2>{tags[tagKey].label}</h2>
          <ul>
            {postsByTag[tagKey]?.map((post) => (
              <li key={post.title}>
                <a href={post.permalink}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TagsPage;
