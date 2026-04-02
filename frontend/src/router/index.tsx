import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DonorSearchPage from '../pages/DonorSearchPage';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import AnnouncementDetailPage from '../pages/AnnouncementDetailPage';
import CampaignsPage from '../pages/CampaignsPage';
import CampaignDetailPage from '../pages/CampaignDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

import DashboardPage from '../pages/DashboardPage';
import AnnouncementCreatePage from '../pages/AnnouncementCreatePage';
import CampaignCreatePage from '../pages/CampaignCreatePage';
import MatchingPage from '../pages/MatchingPage';
import ProfilePage from '../pages/ProfilePage';
import ProfileEditPage from '../pages/ProfileEditPage';

import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import AdminAnnouncementsPage from '../pages/admin/AdminAnnouncementsPage';
import AdminCampaignsPage from '../pages/admin/AdminCampaignsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'donors', element: <DonorSearchPage /> },
      { path: 'announcements', element: <AnnouncementsPage /> },
      { path: 'announcements/:id', element: <AnnouncementDetailPage /> },
      { path: 'campaigns', element: <CampaignsPage /> },
      { path: 'campaigns/:id', element: <CampaignDetailPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'profile/edit', element: <ProfileEditPage /> },
      { path: 'announcements/create', element: <AnnouncementCreatePage /> },
      { path: 'campaigns/create', element: <CampaignCreatePage /> },
      { path: 'matches', element: <MatchingPage /> },
    ],
  },
  {
    path: '/admin',
    element: <ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'users', element: <AdminUsersPage /> },
      { path: 'announcements', element: <AdminAnnouncementsPage /> },
      { path: 'campaigns', element: <AdminCampaignsPage /> },
    ],
  },
  { path: '*', element: <Layout />, children: [{ path: '*', element: <NotFoundPage /> }] },
]);
