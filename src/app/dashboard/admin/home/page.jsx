// Header 
// Sciial Links
// Testimonials

'use client';
import SidebarLayout from "@/components/Admin_Components/SideBar/Sidebar";
import HeaderAdmin from "@/components/Admin_Components/Home_Admin/HeaderAdmin";
import SocialMediaAdmin from "@/components/Admin_Components/Home_Admin/SocialMediaAdmin";
import TestimonialAdmin from "@/components/Admin_Components/Home_Admin/TestimonialAdmin";

export default function Page() {
    return (
        <>
            <SidebarLayout
                currentTab="home"
            >
                <HeaderAdmin />
                <SocialMediaAdmin />
                <TestimonialAdmin />
            </SidebarLayout>
        </>
    )
}

