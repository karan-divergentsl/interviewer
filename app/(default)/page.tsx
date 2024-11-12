"use client";

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import { useAuth } from "@/context/AuthContext";
import TaskTable from "@/components/task-list/TaskTable";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <PageIllustration />
      {!isAuthenticated ? 
        <Hero /> 
        :(
          <> 
          <div className="w-3/4 mx-auto my-12">
          <TaskTable />
          </div>
          </>
        )}
    </>
  );
}
