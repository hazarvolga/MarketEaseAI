
"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ListFilter, Search, Building as BuildingIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for companies
const companiesMock = [
  { id: '1', name: 'Innovatech Solutions', industry: 'Construction Software', contactsCount: 5, dateAdded: '2023-07-10' },
  { id: '2', name: 'ArchStruct Inc.', industry: 'Architectural Design', contactsCount: 3, dateAdded: '2023-06-20' },
  { id: '3', name: 'DesignPro Ltd.', industry: 'Project Management', contactsCount: 8, dateAdded: '2023-05-01' },
  { id: '4', name: 'BuildWell Group', industry: 'Construction Consulting', contactsCount: 2, dateAdded: '2023-08-15' },
];

export default function CompaniesPage() {
  return (
    <MainLayout pageTitle="Companies">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Company Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage your client or prospect companies.
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/email-marketing/companies/add">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Company
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Companies ({companiesMock.length})</CardTitle>
             <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search companies (name, industry...)" className="pl-8 w-full" />
              </div>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {companiesMock.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-1 py-3 text-left">
                        <Checkbox aria-label="Select all" />
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Industry</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Contacts Count</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date Added</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    {companiesMock.map((company) => (
                      <tr key={company.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-1 py-3 whitespace-nowrap">
                           <Checkbox aria-label={`Select company: ${company.name}`} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-foreground">{company.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{company.industry}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{company.contactsCount}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{company.dateAdded}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                            <Link href={`/email-marketing/companies/${company.id}`}>Details/Edit</Link>
                          </Button>
                           <Button variant="link" size="sm" className="p-0 h-auto ml-2 text-destructive hover:text-destructive/80" onClick={() => alert('Delete action is not implemented in this prototype.')}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <BuildingIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium text-foreground">No companies found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Add a new company to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
