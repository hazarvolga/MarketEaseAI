
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-marketing-content.ts';
import '@/ai/flows/suggest-hashtags-flow.ts';
import '@/ai/flows/suggest-subject-lines-flow.ts';
import '@/ai/flows/generate-campaign-elements.ts'; // Added new flow
