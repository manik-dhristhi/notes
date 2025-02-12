import { Octokit } from "@octokit/rest";
import { Configuration, OpenAIApi } from "openai";

// Initialize GitHub and OpenAI clients
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to fetch PR diff
async function fetchPRDiff(owner, repo, pull_number) {
  const response = await octokit.pulls.get({
    owner,
    repo,
    pull_number,
    mediaType: {
      format: "diff",
    },
  });
  return response.data;
}

// Function to analyze code using OpenAI
async function analyzeCode(code) {
  const prompt = `Please review the following code diff and categorize its quality as 'Good,' 'Extraordinary,' or 'Needs Work'. Provide a brief explanation for your categorization.\n\n${code}`;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 150,
  });
  return response.data.choices[0].text.trim();
}

// Main function
async function main() {
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  const repo = process.env.GITHUB_REPOSITORY;
  const pull_number = process.env.PULL_REQUEST_NUMBER;

  const diff = await fetchPRDiff(owner, repo, pull_number);
  const analysis = await analyzeCode(diff);

  // Post the analysis as a comment on the PR
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: pull_number,
    body: analysis,
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
