export default function FrontPage() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-3 bg-gray-900 justify-center items-center">
        <div className="w-full flex justify-center">
          <img src="images/superadmin.png" alt="Phsar Leau" className="w-60" />
        </div>
        <div className="w-full flex gap-2 justify-center">
          <a
            href="/dashboard"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200 "
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 text-white rounded-md group-hover:bg-opacity-0">
              Dashboard
            </span>
          </a>
          <a
            href="/login"
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-200"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 text-white rounded-md group-hover:bg-opacity-0">
              Login admin
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
