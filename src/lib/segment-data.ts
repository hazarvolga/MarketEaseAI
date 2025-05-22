
export interface Segment {
  id: string;
  name: string;
  criteria: string;
  contactsCount: number;
  creationDate: string;
}

export const initialSegmentsMock: Segment[] = [
  { id: 'seg-1', name: 'Active Users (Last 30 Days)', criteria: 'Last login < 30 days AGO AND open rate > 10%', contactsCount: 450, creationDate: '2023-08-01' },
  { id: 'seg-2', name: 'Construction Industry Newsletter', criteria: 'Industry = Construction AND List = Newsletter Subscribers', contactsCount: 320, creationDate: '2023-07-15' },
  { id: 'seg-3', name: 'Low Engagement Subscribers', criteria: 'No opens in last 3 campaigns', contactsCount: 150, creationDate: '2023-09-05' },
  { id: 'seg-4', name: 'High-Value E-commerce Shoppers', criteria: 'Total Purchase Value > $500 AND Last Purchase < 60 days', contactsCount: 85, creationDate: '2024-01-10'},
  { id: 'seg-5', name: 'Potential Leads from Webinar', criteria: 'Attended "Future of AI Webinar" AND Not In Customer List', contactsCount: 0, creationDate: '2024-03-01'},
];
