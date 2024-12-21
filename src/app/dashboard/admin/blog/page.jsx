// blog 
// Ctaegory
'use client';
import React, { useState, useEffect } from 'react';
import SideBar from "@/components/Admin_Components/SideBar/Sidebar";
import CategoryAdmin from '@/components/Admin_Components/Blog_Category_Admin/CategoriesAdim';
import BlogAdmin from '@/components/Admin_Components/Blog_Category_Admin/BlogAdmin';
export default function Page() {
    return (
        <SideBar
            currentTab="blog"
        >
            <CategoryAdmin />
            <BlogAdmin />
        </SideBar>
    )
}