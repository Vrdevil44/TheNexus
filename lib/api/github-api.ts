export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    created_at: string;
    topics: string[];
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
    try {
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };

        // Only add Authorization header if token is available
        // This is optional - GitHub API works without it for public repos
        // With token: 5000 requests/hour, without: 60 requests/hour
        if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
            headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
        }

        const response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            {
                headers,
                // Cache for 5 minutes to avoid rate limits
                next: { revalidate: 300 }
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos: GitHubRepo[] = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}
