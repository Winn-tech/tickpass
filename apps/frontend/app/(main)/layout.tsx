import TickpassNavbar from '../_components/navbar'
import TickPassFooter from '../_components/footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TickpassNavbar />
      <section className="mt-20">
        {children}
      </section>
      <TickPassFooter />
    </>
  )
}