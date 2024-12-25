// Why Chose Us Page
// About Us Page
'use client';
import AboutInfoAdmin from "@/components/Admin_Components/About_WhyUS_Admin/AboutInfoAdmin";
import AboutUsAdmin from "@/components/Admin_Components/About_WhyUS_Admin/AboutUSAdmin";
import WhyChoseUSAdmin from "@/components/Admin_Components/About_WhyUS_Admin/WhyChoseUSAdmin";
import SidebarLayout from "@/components/Admin_Components/SideBar/Sidebar";


export default function Page() {
    return (
        <SidebarLayout
            currentTab="aboutus"
        >
            <WhyChoseUSAdmin />
            <AboutUsAdmin />
            <AboutInfoAdmin />
        </SidebarLayout>
    )
}