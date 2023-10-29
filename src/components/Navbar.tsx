export default function Navbar() {
  return (
    <nav className="py-6 px-8 border-b-2 border-zinc-600 flex flex-row items-center justify-around">
      <h1 className="text-black text-2xl font-bold">Movies App</h1>

      <div>
        <input type="text" placeholder="Search any movie or series..." />
      </div>
    </nav>
  )
}
