import NavBar from '@/components/nav-bar';
import SideBarMenu from '@/components/side-bar';
export default function notificationMod() {
  return (
    <>
      <NavBar />
      <main className="flex">
        <SideBarMenu />
        <div class="max-w-container mx-auto p-4">
          <div class="border border-green">
            <div class="flex items-center justify-center border border-green bg-green">
              <h2 class="mb-4 mr-1 text-2xl font-bold text-yellow">Notification</h2>
            </div>
            <div class=" border-green p-8 shadow-md">
              {/* notification card */}
              <div class="mb-4 flex justify-between">
                <div class="ml-4 rounded-md border border-green p-4">
                  <p>
                    Student Jesusa Claridad is currently failing the subject ITEC-111 with a GWA of
                    1.25
                  </p>
                </div>
                <button class="ml-3 rounded-full bg-green p-4 font-bold text-white">Send</button>
              </div>

              {/* notification card */}
              <div class="mb-4 flex justify-between">
                <div class="ml-4 rounded-md border border-green p-4">
                  <p>
                    Student Romeo Cobreta is a candidate for honors the subject ITEC 111 with a GWA
                    of 1.00
                  </p>
                </div>
                <button class="ml-3 rounded-full bg-green p-4 font-bold text-white">Send</button>
              </div>

              {/* notification card */}
              <div class="mb-4 flex justify-between">
                <div class="ml-4 rounded-md border border-green p-4">
                  <p>
                    Student Anthony Buganan is currently failing the subject ITEC 111 with a GWA of
                    5.00
                  </p>
                </div>
                <button class="ml-3 rounded-full bg-green p-4 font-bold text-white">Send</button>
              </div>
              <button class="ml-4 self-end rounded-full bg-green px-4 py-2 font-bold text-yellow">
                Send All
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
