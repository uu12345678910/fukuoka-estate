import { createClient } from '@sanity/client'

const client = createClient({
    projectId: '02xejsjz',
    dataset: 'production',
    apiVersion: '2024-03-04',
    token: 'skUf7a5L3UqgGkYtTz3mKq8wLz9jXv5yTcUf7a5L3UqgGkYtTz3mKq8wLz9jXv5yTcUf7a5', // We don't have token natively, better to just use NDJSON and delete via CLI.
    useCdn: false
})
