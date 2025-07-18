import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'ud2elmtd', // ✅ Replace with your actual Sanity project ID
  dataset: 'teboho-portfolio',
  useCdn: true,
  apiVersion: '2023-07-18',
});