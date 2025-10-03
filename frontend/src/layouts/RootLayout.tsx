import { Outlet } from "react-router-dom"
import SiteHeader from "../components/layout/SiteHeader"
import SiteFooter from "../components/layout/SiteFooter"

function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default RootLayout
