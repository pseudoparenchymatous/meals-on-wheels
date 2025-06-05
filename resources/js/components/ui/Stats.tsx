export default function Stats() {
    return (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-5xl font-bold">12,500+</p>
              <p className="text-sm">People Helped</p>
            </div>
            <div>
              <p className="text-5xl font-bold">75,000+</p>
              <p className="text-sm">Meals Delivered</p>
            </div>
            <div>
              <p className="text-5xl font-bold">1,200+</p>
              <p className="text-sm">Volunteers</p>
            </div>
          </div>
        </>
    )
}
