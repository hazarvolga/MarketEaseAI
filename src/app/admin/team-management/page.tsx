
"use client";

import * as React from "react";
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { handleUpdateUserRoleAction, type UpdateUserRoleInput } from "./actions";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Editor" | "Publisher" | "Viewer";
  avatarUrl?: string;
  lastLogin?: string;
}

const mockTeamMembers: MockUser[] = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com', role: 'Admin', avatarUrl: 'https://placehold.co/40x40.png', lastLogin: '2 hours ago' },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', role: 'Manager', avatarUrl: 'https://placehold.co/40x40.png', lastLogin: '1 day ago' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', avatarUrl: 'https://placehold.co/40x40.png', lastLogin: '5 hours ago' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', role: 'Publisher', avatarUrl: 'https://placehold.co/40x40.png', lastLogin: '3 days ago' },
  { id: 'user5', name: 'Edward Scissorhands', email: 'edward@example.com', role: 'Viewer', avatarUrl: 'https://placehold.co/40x40.png', lastLogin: '1 week ago' },
];

type UserRole = MockUser['role'];
const userRoles: UserRole[] = ["Admin", "Manager", "Editor", "Publisher", "Viewer"];

export default function TeamManagementPage() {
  const { toast } = useToast();
  const [isInviteModalOpen, setIsInviteModalOpen] = React.useState(false);
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserRole, setNewUserRole] = React.useState<UserRole>("Viewer");
  
  const [teamMembers, setTeamMembers] = React.useState<MockUser[]>(mockTeamMembers);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<MockUser | null>(null);
  const [selectedNewRole, setSelectedNewRole] = React.useState<UserRole | null>(null);

  const handleInviteUser = () => {
    if (!newUserEmail.trim() || !/\S+@\S+\.\S+$/.test(newUserEmail.trim())) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    const newUser: MockUser = {
      id: `user${teamMembers.length + 1}`,
      name: "New User (Invited)", 
      email: newUserEmail,
      role: newUserRole,
      avatarUrl: `https://placehold.co/40x40.png?text=${newUserEmail.charAt(0).toUpperCase()}`,
      lastLogin: "Never"
    };
    setTeamMembers(prev => [...prev, newUser]);

    toast({
      title: "User Invited (Simulation)",
      description: `${newUserEmail} has been invited as a ${newUserRole}.`,
    });
    setIsInviteModalOpen(false);
    setNewUserEmail("");
    setNewUserRole("Viewer");
  };
  
  const handleOpenEditRoleModal = (user: MockUser) => {
    setEditingUser(user);
    setSelectedNewRole(user.role); // Pre-fill with current role
    setIsEditRoleModalOpen(true);
  };

  const handleSaveRoleChange = async () => {
    if (!editingUser || !selectedNewRole) return;

    const result = await handleUpdateUserRoleAction({ userId: editingUser.id, newRole: selectedNewRole });

    if (result.success) {
      setTeamMembers(prev => 
        prev.map(user => 
          user.id === editingUser.id ? { ...user, role: selectedNewRole } : user
        )
      );
      toast({ title: "Role Updated", description: result.message });
    } else {
      let errorDescription = "Failed to update role.";
      if (typeof result.error === 'string') {
        errorDescription = result.error;
      } else if (result.error && 'flatten' in result.error) {
        errorDescription = JSON.stringify((result.error as any).flatten().fieldErrors);
      }
      toast({ title: "Update Failed", description: errorDescription, variant: "destructive" });
    }
    setIsEditRoleModalOpen(false);
    setEditingUser(null);
    setSelectedNewRole(null);
  };

  const handleRemoveUser = (userId: string, userName: string) => {
    setTeamMembers(prev => prev.filter(user => user.id !== userId));
    toast({ title: "User Removed (Simulation)", description: `${userName} has been removed from the team.`, variant: "destructive" });
  };


  return (
    <MainLayout pageTitle="Team Management">
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Team Members</CardTitle>
              <CardDescription>Manage your team members, their roles, and permissions.</CardDescription>
            </div>
            <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-5 w-5" /> Invite New Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite New Team Member</DialogTitle>
                  <DialogDescription>
                    Enter the email address and select a role for the new team member.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="newUserEmail">Email Address</Label>
                    <Input
                      id="newUserEmail"
                      type="email"
                      placeholder="member@example.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="newUserRole">Role</Label>
                    <Select value={newUserRole} onValueChange={(value) => setNewUserRole(value as UserRole)}>
                      <SelectTrigger id="newUserRole">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map(role => (
                          <SelectItem key={role} value={role}>{role}{role === 'Admin' ? ' (Full Access)' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter className="sm:justify-between">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="button" onClick={handleInviteUser} disabled={!newUserEmail.trim()}>
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'default' : (user.role === 'Manager' ? 'secondary' : 'outline')}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-1" onClick={() => handleOpenEditRoleModal(user)}>
                        <Edit className="h-4 w-4 mr-1" /> Edit Role
                      </Button>
                      {user.role !== 'Admin' && ( 
                         <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90" onClick={() => handleRemoveUser(user.id, user.name)}>
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             {teamMembers.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No team members yet. Invite someone to get started!</p>
            )}
          </CardContent>
        </Card>

        {editingUser && (
          <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Role for {editingUser.name}</DialogTitle>
                <DialogDescription>
                  Select a new role for {editingUser.email}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-3">
                <div className="space-y-1.5">
                  <Label htmlFor="editUserRole">New Role</Label>
                  <Select value={selectedNewRole ?? editingUser.role} onValueChange={(value) => setSelectedNewRole(value as UserRole)}>
                    <SelectTrigger id="editUserRole">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {userRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}{role === 'Admin' ? ' (Full Access)' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="outline" onClick={() => { setEditingUser(null); setSelectedNewRole(null); }}>Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleSaveRoleChange} disabled={!selectedNewRole || selectedNewRole === editingUser.role}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

      </div>
    </MainLayout>
  );
}
