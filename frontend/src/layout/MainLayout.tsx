import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router";
import { LeftSidebar } from "./components/LeftSidebar";
import { FriendsActivity } from "./components/FriendsActivity";

export const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col ">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full p-2 overflow-hidden"
      >
        <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 20}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        <ResizablePanel defaultSize={60} minSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
