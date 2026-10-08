import { useMemo, useState } from 'react'

const demoOtp = '4629'

const initialRooms = [
  {
    id: 1,
    title: 'Sunny student room near Patan Campus',
    location: 'Patan Dhoka, Lalitpur',
    area: 'Patan',
    rent: 12000,
    deposit: 12000,
    status: 'Available',
    unitRate: 15,
    waterBase: 700,
    maintenance: 500,
    usage: 42,
    ownerId: 1,
    seekerId: null,
    description:
      'A quiet south-facing room with attached balcony, shared kitchen access, and direct owner communication.',
    facilities: ['WiFi', 'Furnished', 'Shared kitchen', 'Attached balcony', 'Bike parking'],
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 2,
    title: 'Budget room with private entrance',
    location: 'Koteshwor, Kathmandu',
    area: 'Koteshwor',
    rent: 9500,
    deposit: 5000,
    status: 'Available',
    unitRate: 14,
    waterBase: 500,
    maintenance: 300,
    usage: 31,
    ownerId: 2,
    seekerId: null,
    description:
      'Compact room for a student or working renter. Separate entry, fast bus access, and no hidden listing fee.',
    facilities: ['WiFi', 'Private entrance', 'Shared bathroom', 'Water tank', 'Near bus stop'],
    photos: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1560184897-502a475f7a0d?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 3,
    title: 'Verified room for two near Ring Road',
    location: 'Banasthali, Kathmandu',
    area: 'Banasthali',
    rent: 15500,
    deposit: 15500,
    status: 'Unavailable',
    unitRate: 16,
    waterBase: 900,
    maintenance: 800,
    usage: 56,
    ownerId: 1,
    seekerId: 1,
    description:
      'Already rented through shared OTP confirmation. The room remains visible as a transparent record.',
    facilities: ['WiFi', 'Furnished', 'Private bathroom', 'Kitchen access', 'Rooftop drying'],
    photos: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

const owners = [
  {
    id: 1,
    name: 'Asha Maharjan',
    photo: 'AM',
    house: 'Maharjan Niwas',
    propertyLocation: 'Patan Dhoka',
    contact: '9841000021',
    bio: 'Family-owned property near colleges and bus routes. Prefers verified students and direct communication.',
    responseTime: 'Usually replies within 2 hours',
    verified: true,
  },
  {
    id: 2,
    name: 'Ramesh Karki',
    photo: 'RK',
    house: 'Karki House',
    propertyLocation: 'Koteshwor',
    contact: '9803001144',
    bio: 'Owner-managed rooms with private access and transparent monthly utility costs.',
    responseTime: 'Usually replies the same day',
    verified: true,
  },
]

const seekers = [
  {
    id: 1,
    name: 'Sujan Tamang',
    photo: 'ST',
    contact: '9812345678',
    email: 'sujan.tamang@example.com',
    occupation: 'BCA student',
    hometown: 'Dhulikhel',
    currentAddress: 'Bagbazar hostel',
    emergencyContact: '9845001111',
    moveInDate: 'June 1, 2026',
    budget: 16000,
    idFront: 'Uploaded',
    idBack: 'Uploaded',
    verified: true,
  },
  {
    id: 2,
    name: 'Mina Gurung',
    photo: 'MG',
    contact: '9867554321',
    email: 'mina.gurung@example.com',
    occupation: 'Nursing student',
    hometown: 'Pokhara',
    currentAddress: 'Gwarko temporary stay',
    emergencyContact: '9819002211',
    moveInDate: 'May 20, 2026',
    budget: 13000,
    idFront: 'Uploaded',
    idBack: 'Uploaded',
    verified: true,
  },
]

const initialRequests = [
  {
    id: 1,
    roomId: 1,
    ownerId: 1,
    seekerId: 2,
    status: 'Pending',
    message: 'I can visit this Saturday and can move in from next month.',
    ownerOtpVerified: false,
    seekerOtpVerified: false,
  },
  {
    id: 2,
    roomId: 3,
    ownerId: 1,
    seekerId: 1,
    status: 'Completed',
    message: 'Confirmed after room tour.',
    ownerOtpVerified: true,
    seekerOtpVerified: true,
  },
]

const initialChats = {
  2: [
    { from: 'owner', body: 'Welcome, Sujan. Rent and utility breakdown is visible in the room space.' },
    { from: 'seeker', body: 'Thank you. I will update the payment after bank transfer.' },
  ],
}

const initialNotices = [
  { id: 1, roomId: 3, author: 'owner', text: 'Turn off corridor lights before sleeping.' },
  { id: 2, roomId: 3, author: 'seeker', text: 'Please keep the shared kitchen clean after dinner.' },
]

const initialPayments = [
  { roomId: 3, month: 'March 2026', paid: true, reminded: false },
  { roomId: 3, month: 'April 2026', paid: true, reminded: false },
  { roomId: 3, month: 'May 2026', paid: false, reminded: false },
]

const currency = new Intl.NumberFormat('en-NP', {
  style: 'currency',
  currency: 'NPR',
  maximumFractionDigits: 0,
})

function App() {
  const [role, setRole] = useState('seeker')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authMethod, setAuthMethod] = useState('Google')
  const [rooms, setRooms] = useState(initialRooms)
  const [requests, setRequests] = useState(initialRequests)
  const [chats, setChats] = useState(initialChats)
  const [notices, setNotices] = useState(initialNotices)
  const [payments, setPayments] = useState(initialPayments)
  const [selectedRoomId, setSelectedRoomId] = useState(1)
  const [filters, setFilters] = useState({ area: 'All', maxRent: 18000, query: '' })
  const [requestText, setRequestText] = useState('I am verified and would like to schedule a room tour.')
  const [chatText, setChatText] = useState('')
  const [noticeText, setNoticeText] = useState('')
  const [otpInput, setOtpInput] = useState('')
  const [detailMode, setDetailMode] = useState('overview')
  const [page, setPage] = useState('dashboard')
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [favoriteRoomIds, setFavoriteRoomIds] = useState([2])
  const [listingDraft, setListingDraft] = useState({
    title: '',
    location: '',
    rent: 10000,
    deposit: 5000,
    unitRate: 15,
    waterBase: 500,
    maintenance: 300,
    photos: '',
  })

  const currentOwner = owners[0]
  const currentSeeker = seekers[0]
  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) || rooms[0]
  const selectedOwner = owners.find((owner) => owner.id === selectedRoom.ownerId)
  const selectedOwnerListings = rooms.filter((room) => room.ownerId === selectedRoom.ownerId)
  const selectedRequest = requests.find((request) => request.id === selectedRequestId)
  const selectedSeeker = seekers.find((seeker) => seeker.id === selectedRequest?.seekerId)
  const activeRequest = requests.find(
    (request) => request.roomId === selectedRoom.id && request.seekerId === currentSeeker.id,
  )

  const filteredRooms = useMemo(() => {
    const query = filters.query.toLowerCase()
    return rooms.filter((room) => {
      const matchesArea = filters.area === 'All' || room.area === filters.area
      const matchesRent = room.rent <= Number(filters.maxRent)
      const matchesQuery = `${room.title} ${room.location} ${room.facilities.join(' ')}`
        .toLowerCase()
        .includes(query)
      return matchesArea && matchesRent && matchesQuery
    })
  }, [filters, rooms])

  const ownerRooms = rooms.filter((room) => room.ownerId === currentOwner.id)
  const ownerRequests = requests.filter((request) => ownerRooms.some((room) => room.id === request.roomId))
  const stats =
    role === 'seeker'
      ? [
        { label: 'Available rooms', value: rooms.filter((room) => room.status === 'Available').length },
        { label: 'My requests', value: requests.filter((request) => request.seekerId === currentSeeker.id).length },
        { label: 'Favorite rooms', value: favoriteRoomIds.length },
      ]
      : [
        { label: 'My listings', value: ownerRooms.length },
        { label: 'Pending requests', value: ownerRequests.filter((request) => request.status === 'Pending').length },
        { label: 'Active tenants', value: ownerRooms.filter((room) => room.status === 'Unavailable').length },
      ]

  function sendRequest(roomId) {
    if (requests.some((request) => request.roomId === roomId && request.seekerId === currentSeeker.id)) {
      return
    }

    const room = rooms.find((item) => item.id === roomId)
    setRequests((items) => [
      {
        id: Date.now(),
        roomId,
        ownerId: room.ownerId,
        seekerId: currentSeeker.id,
        status: 'Pending',
        message: requestText,
        ownerOtpVerified: false,
        seekerOtpVerified: false,
      },
      ...items,
    ])
  }

  function updateRequest(requestId, status) {
    setRequests((items) => items.map((item) => (item.id === requestId ? { ...item, status } : item)))
    if (status === 'Accepted') {
      setChats((items) => ({
        ...items,
        [requestId]: items[requestId] || [
          { from: 'owner', body: 'Request accepted. We can now discuss visit time and final confirmation.' },
        ],
      }))
    }
  }

  function verifyOtp(requestId) {
    if (otpInput !== demoOtp) return

    const field = role === 'owner' ? 'ownerOtpVerified' : 'seekerOtpVerified'
    setRequests((items) =>
      items.map((item) => {
        if (item.id !== requestId) return item
        const updated = { ...item, [field]: true }
        if (updated.ownerOtpVerified && updated.seekerOtpVerified) {
          const room = rooms.find((roomItem) => roomItem.id === item.roomId)
          setRooms((roomItems) =>
            roomItems.map((roomItem) =>
              roomItem.id === item.roomId
                ? { ...roomItem, status: 'Unavailable', seekerId: item.seekerId }
                : roomItem,
            ),
          )
          setPayments((paymentItems) => [
            ...paymentItems,
            { roomId: item.roomId, month: 'Current month', paid: false, reminded: false },
          ])
          setSelectedRoomId(room.id)
          return { ...updated, status: 'Completed' }
        }
        return updated
      }),
    )
    setOtpInput('')
  }

  function sendChat(requestId) {
    if (!chatText.trim()) return
    setChats((items) => ({
      ...items,
      [requestId]: [...(items[requestId] || []), { from: role, body: chatText.trim() }],
    }))
    setChatText('')
  }

  function addNotice(roomId) {
    if (!noticeText.trim()) return
    setNotices((items) => [{ id: Date.now(), roomId, author: role, text: noticeText.trim() }, ...items])
    setNoticeText('')
  }

  function addListing(event) {
    event.preventDefault()
    const photos = listingDraft.photos
      .split('\n')
      .map((photo) => photo.trim())
      .filter(Boolean)

    if (photos.length < 4) return

    const room = {
      id: Date.now(),
      title: listingDraft.title || 'New verified room listing',
      location: listingDraft.location || 'Kathmandu',
      area: 'Kathmandu',
      rent: Number(listingDraft.rent),
      deposit: Number(listingDraft.deposit),
      status: 'Available',
      unitRate: Number(listingDraft.unitRate),
      waterBase: Number(listingDraft.waterBase),
      maintenance: Number(listingDraft.maintenance),
      usage: 0,
      ownerId: currentOwner.id,
      seekerId: null,
      description: 'Owner-created listing with transparent costs and direct rental requests.',
      facilities: ['WiFi', 'Water', 'Owner verified', 'No broker fee'],
      photos,
    }
    setRooms((items) => [room, ...items])
    setSelectedRoomId(room.id)
    setListingDraft({
      title: '',
      location: '',
      rent: 10000,
      deposit: 5000,
      unitRate: 15,
      waterBase: 500,
      maintenance: 300,
      photos: '',
    })
  }

  function updateUsage(roomId, usage, usageRole) {
    setRooms((items) => items.map((room) => {
      if (room.id === roomId) {
        if (usageRole === 'seeker') return { ...room, seekerUsage: Number(usage) }
        return { ...room, usage: Number(usage) }
      }
      return room
    }))
  }

  function updateRoom(roomId, updates) {
    setRooms((items) => items.map((room) => (room.id === roomId ? { ...room, ...updates } : room)))
  }

  function togglePaid(roomId) {
    setPayments((items) => items.map((item) => (item.roomId === roomId ? { ...item, paid: !item.paid } : item)))
  }

  function remind(roomId) {
    setPayments((items) => items.map((item) => (item.roomId === roomId ? { ...item, reminded: true } : item)))
  }

  function enterApp(nextRole) {
    setRole(nextRole)
    setSelectedRoomId(nextRole === 'owner' ? ownerRooms[0]?.id || 1 : 1)
    setPage('dashboard')
    setIsAuthenticated(true)
  }

  function openRoomPage(roomId) {
    setSelectedRoomId(roomId)
    setPage('room')
  }

  function openSeekerPage(requestId) {
    const request = requests.find((item) => item.id === requestId)
    if (request) {
      setSelectedRequestId(requestId)
      setSelectedRoomId(request.roomId)
      setPage('seeker')
    }
  }

  function toggleFavoriteRoom(roomId) {
    setFavoriteRoomIds((items) =>
      items.includes(roomId) ? items.filter((item) => item !== roomId) : [...items, roomId],
    )
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        role={role}
        setRole={setRole}
        authMethod={authMethod}
        setAuthMethod={setAuthMethod}
        enterApp={enterApp}
      />
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <TopBar
        role={role}
        authMethod={authMethod}
        onHome={() => setPage('dashboard')}
        onSignOut={() => setIsAuthenticated(false)}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:py-8">
        {page === 'room' && (
          <RoomDetailPage
            room={selectedRoom}
            owner={selectedOwner}
            ownerListings={selectedOwnerListings}
            request={activeRequest}
            requestText={requestText}
            setRequestText={setRequestText}
            sendRequest={sendRequest}
            onBack={() => setPage('dashboard')}
          />
        )}

        {page === 'seeker' && selectedRequest && selectedSeeker && (
          <SeekerDetailPage
            seeker={selectedSeeker}
            request={selectedRequest}
            room={selectedRoom}
            updateRequest={updateRequest}
            onBack={() => setPage('dashboard')}
          />
        )}

        {page === 'manage-tenant' && selectedRoom && (
          <ManageTenantPage
            room={selectedRoom}
            owner={selectedOwner}
            seeker={selectedRoom.seekerId ? seekers.find(s => s.id === selectedRoom.seekerId) : null}
            onBack={() => setPage('dashboard')}
            updateRoom={updateRoom}
            role={role}
            requests={requests}
            chats={chats}
            chatText={chatText}
            setChatText={setChatText}
            sendChat={sendChat}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            verifyOtp={verifyOtp}
            notices={notices}
            noticeText={noticeText}
            setNoticeText={setNoticeText}
            addNotice={addNotice}
            payments={payments}
            updateUsage={updateUsage}
            togglePaid={togglePaid}
            remind={remind}
          />
        )}

        {page === 'my-room' && selectedRoom && (
          <MyRoomPage
            room={selectedRoom}
            owner={owners.find(o => o.id === selectedRoom.ownerId)}
            onBack={() => setPage('dashboard')}
            role={role}
            requests={requests}
            chats={chats}
            chatText={chatText}
            setChatText={setChatText}
            sendChat={sendChat}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            verifyOtp={verifyOtp}
            notices={notices}
            noticeText={noticeText}
            setNoticeText={setNoticeText}
            addNotice={addNotice}
            payments={payments}
            updateUsage={updateUsage}
            togglePaid={togglePaid}
            remind={remind}
          />
        )}

        {page === 'notices' && (
          <NoticesPage
            notices={notices}
            noticeText={noticeText}
            setNoticeText={setNoticeText}
            addNotice={() => addNotice(selectedRoomId)}
            onBack={() => setPage('dashboard')}
          />
        )}

        {page === 'dashboard' && (
          <>
            <HeroSummary role={role} stats={stats} />

            <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
              <section className="space-y-5">
                {role === 'seeker' ? (
                  <WorkspacePanel
                    eyebrow="Seeker workspace"
                    title="Browse verified rooms"
                    description="Search, compare costs, and send a direct request to the owner."
                  >
                    <SeekerFilters filters={filters} setFilters={setFilters} />
                    <RoomFeed
                      rooms={filteredRooms}
                      owners={owners}
                      selectedRoomId={selectedRoomId}
                      setSelectedRoomId={setSelectedRoomId}
                      openRoomPage={openRoomPage}
                      favoriteRoomIds={favoriteRoomIds}
                      toggleFavoriteRoom={toggleFavoriteRoom}
                      requests={requests}
                      sendRequest={sendRequest}
                    />
                  </WorkspacePanel>
                ) : (
                  <OwnerDashboard
                    rooms={ownerRooms}
                    requests={requests}
                    seekers={seekers}
                    setSelectedRoomId={setSelectedRoomId}
                    updateRequest={updateRequest}
                    addListing={addListing}
                    listingDraft={listingDraft}
                    setListingDraft={setListingDraft}
                    openSeekerPage={openSeekerPage}
                    openManagePage={(roomId) => { setSelectedRoomId(roomId); setPage('manage-tenant'); }}
                  />
                )}
              </section>

              <aside className="space-y-4 lg:sticky lg:top-28">
                <AccountPanel
                  authMethod={authMethod}
                  setAuthMethod={setAuthMethod}
                  role={role}
                  owner={currentOwner}
                  seeker={currentSeeker}
                  ownerRooms={ownerRooms}
                />
                {role !== 'owner' && (
                  <div className="space-y-4">
                    {rooms.some(r => r.seekerId === currentSeeker?.id) && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center shadow-sm">
                        <h3 className="text-lg font-black text-emerald-900">My Rental</h3>
                        <p className="mt-2 text-sm text-emerald-800">Manage your room, track expenses, and chat with the owner.</p>
                        <button
                          type="button"
                          onClick={() => {
                            const myRoom = rooms.find(r => r.seekerId === currentSeeker?.id);
                            if (myRoom) {
                              setSelectedRoomId(myRoom.id);
                              setPage('my-room');
                            }
                          }}
                          className="mt-4 min-h-10 w-full rounded-md bg-emerald-700 px-4 text-sm font-bold text-white hover:bg-emerald-800"
                        >
                          Go to My Room
                        </button>
                      </div>
                    )}
                    <div className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                      <h3 className="text-lg font-black text-slate-900">Communication</h3>
                      <p className="mt-2 text-sm text-slate-600">Check announcements from owners and other tenants.</p>
                      <button
                        type="button"
                        onClick={() => setPage('notices')}
                        className="mt-4 min-h-10 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800"
                      >
                        View All Notices
                      </button>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

function LoginPage({ role, setRole, authMethod, setAuthMethod, enterApp }) {
  const guide =
    role === 'owner'
      ? {
        title: 'How owners list a room',
        subtitle: 'Create a verified post and manage direct requests from seekers.',
        steps: [
          'Complete owner profile with house name, contact, and property location.',
          'Create a room listing with title, rent, deposit, facilities, and at least 4 photos.',
          'Add electricity unit rate plus water or maintenance charges for transparent bills.',
          'Review seeker profiles, accept or reject requests, then chat after acceptance.',
          `Confirm final rental only after both sides enter shared OTP ${demoOtp}.`,
        ],
        action: 'Continue to owner dashboard',
      }
      : {
        title: 'How seekers find a room',
        subtitle: 'Search verified rooms and request directly from the room owner.',
        steps: [
          'Choose seeker role and sign in with the simulated login method.',
          'Browse the room feed and filter by price, area, and facilities.',
          'Open owner details and room location before sending a request.',
          'Send a verified request, then wait for owner approval to unlock chat.',
          'After room visit, confirm the rental with shared OTP and track expenses.',
        ],
        action: 'Continue to room feed',
      }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:grid lg:place-items-center">
      <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="p-5 sm:p-8 lg:p-10">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">No broker rental platform</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
            Enter as the right user, then test the full rental flow.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            This demo starts with role assignment so owners land on listing and request management, while seekers land
            on room browsing and rental requests.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <RoleChoice
              active={role === 'seeker'}
              title="I am a seeker"
              description="Browse rooms, send requests, chat after acceptance, and track expenses."
              onClick={() => setRole('seeker')}
            />
            <RoleChoice
              active={role === 'owner'}
              title="I am an owner"
              description="Publish rooms, review seekers, accept requests, and manage tenants."
              onClick={() => setRole('owner')}
            />
          </div>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-black">Choose login method</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {['Google', 'Phone OTP', 'Email'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setAuthMethod(method)}
                  className={`min-h-11 rounded-md border px-3 text-sm font-bold ${authMethod === method
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {method}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => enterApp(role)}
              className="mt-4 min-h-12 w-full rounded-md bg-slate-950 px-5 text-sm font-black text-white"
            >
              Continue as {role}
            </button>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-950 p-5 text-white sm:p-8 lg:border-l lg:border-t-0">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
            {role === 'owner' ? 'Owner guide' : 'Seeker guide'}
          </p>
          <h2 className="mt-2 text-2xl font-black">{guide.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{guide.subtitle}</p>

          <div className="mt-6 space-y-3">
            {guide.steps.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-lg bg-white/10 p-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-emerald-400 text-sm font-black text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-slate-100">{item}</p>
              </div>
            ))}
          </div>


        </div>
      </section>
    </main>
  )
}

function RoleChoice({ active, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-4 text-left transition ${active ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
        }`}
    >
      <span
        className={`inline-flex h-4 w-4 rounded-full border ${active ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300 bg-white'
          }`}
      />
      <h2 className="mt-4 text-lg font-black">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </button>
  )
}

function TopBar({ role, authMethod, onHome, onSignOut }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">No broker rentals</p>
          <h1 className="truncate text-xl font-black sm:text-2xl">RoomFinder Kathmandu</h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-md bg-emerald-50 px-3 py-2 text-xs font-black capitalize text-emerald-800 sm:inline-flex">
            {role} via {authMethod}
          </span>
          <button
            type="button"
            onClick={onHome}
            className="hidden min-h-10 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50 sm:inline-flex sm:items-center"
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="min-h-10 rounded-md border border-slate-200 px-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            Change role
          </button>
        </div>
      </div>
    </header>
  )
}

function HeroSummary({ role, stats }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            {role === 'seeker' ? 'Find a room without broker fees' : 'Manage rentals without middlemen'}
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {role === 'seeker' ? 'Verified rooms, direct owner requests.' : 'Requests, tenants, expenses, all in one view.'}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A testable mock platform for Kathmandu renters with simulated verification, shared OTP confirmation,
            accepted-only chat, notices, and transparent monthly expenses.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <Metric key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkspacePanel({ eyebrow, title, description, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-black tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
      <div className="space-y-4 p-4 sm:p-5">{children}</div>
    </section>
  )
}

function AccountPanel({ authMethod, setAuthMethod, role, owner, seeker, ownerRooms }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-black">Account</h2>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">Test mode</span>
      </div>
      <ProfileCard role={role} owner={owner} seeker={seeker} />
      {role === 'owner' && <OwnerListingSummary rooms={ownerRooms} />}
      {role !== 'seeker' && <AuthCard authMethod={authMethod} setAuthMethod={setAuthMethod} role={role} />}
      <TrustPanel />
    </section>
  )
}

function AuthCard({ authMethod, setAuthMethod, role }) {
  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <p className="text-sm font-bold text-slate-800">Sign-in method</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {['Google', 'Phone OTP', 'Email'].map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => setAuthMethod(method)}
            className={`min-h-10 rounded-md border px-2 text-center text-xs font-bold ${authMethod === method
              ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
          >
            {method}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Signed in as a test {role}. External auth and uploads are simulated.
      </p>
    </div>
  )
}

function ProfileCard({ role, owner, seeker }) {
  const person = role === 'owner' ? owner : seeker
  return (
    <div className="mt-4 rounded-lg bg-slate-50 p-3">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
          {person.photo}
        </div>
        <div>
          <h2 className="text-lg font-bold">{person.name}</h2>
          <p className="text-sm text-slate-600">{role === 'owner' ? person.house : person.occupation}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <ProfileLine label="Contact" value={person.contact} />
        <ProfileLine
          label={role === 'owner' ? 'Property' : 'Hometown'}
          value={role === 'owner' ? person.propertyLocation : person.hometown}
        />
        <ProfileLine label="ID status" value={role === 'owner' ? 'Owner verified' : 'Front and back uploaded'} />
      </dl>
    </div>
  )
}

function OwnerListingSummary({ rooms }) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-black">My room listings</h3>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold">{rooms.length}</span>
      </div>
      <div className="mt-3 space-y-2">
        {rooms.map((room) => (
          <div key={room.id} className="flex items-center gap-3 rounded-md bg-slate-50 p-2">
            <img src={room.photos[0]} alt="" className="h-10 w-12 rounded-md object-cover" />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900">{room.title}</p>
              <p className="text-xs text-slate-500">{room.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProfileLine({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-semibold text-slate-800">{value}</dd>
    </div>
  )
}

function TrustPanel() {
  return (
    <div className="mt-4 border-t border-slate-100 pt-4">
      <h2 className="text-sm font-bold text-emerald-800">Safety & Trust</h2>
      <ul className="mt-3 space-y-3 text-xs leading-5 text-slate-700">
        <li className="flex items-start gap-2">
          <span className="text-emerald-600">🛡️</span>
          <span><strong>No Broker Fees:</strong> Never pay any middleman or broker fees. You only pay the actual room rent and utility costs directly to the owner.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-600">🔒</span>
          <span><strong>Secure Process:</strong> Chat with verified owners only after request acceptance. Never transfer money before a physical room tour and OTP verification.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-600">📱</span>
          <span><strong>In-App Tracking:</strong> All monthly expenses, water bills, and maintenance fees are transparently tracked within your tenant portal.</span>
        </li>
      </ul>
    </div>
  )
}

function SeekerFilters({ filters, setFilters }) {
  return (
    <section className="rounded-lg bg-slate-50 p-3">
      <div className="grid gap-3 md:grid-cols-[1fr_150px_190px]">
        <input
          value={filters.query}
          onChange={(event) => setFilters({ ...filters, query: event.target.value })}
          placeholder="Search location, facility, or room"
          className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
        />
        <select
          value={filters.area}
          onChange={(event) => setFilters({ ...filters, area: event.target.value })}
          className="min-h-11 rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
        >
          {['All', 'Patan', 'Koteshwor', 'Banasthali', 'Kathmandu'].map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
        <label className="text-sm font-semibold text-slate-700">
          Max rent {currency.format(filters.maxRent)}
          <input
            type="range"
            min="8000"
            max="25000"
            step="500"
            value={filters.maxRent}
            onChange={(event) => setFilters({ ...filters, maxRent: event.target.value })}
            className="mt-2 block w-full accent-emerald-600"
          />
        </label>
      </div>
    </section>
  )
}

function RoomFeed({
  rooms,
  owners,
  selectedRoomId,
  setSelectedRoomId,
  openRoomPage,
  favoriteRoomIds,
  toggleFavoriteRoom,
  requests,
  sendRequest,
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      {rooms.map((room) => {
        const requested = requests.some((request) => request.roomId === room.id && request.seekerId === 1)
        const owner = owners.find((item) => item.id === room.ownerId)
        const isFavorite = favoriteRoomIds.includes(room.id)

        return (
          <article
            key={room.id}
            className={`overflow-hidden rounded-lg border bg-white shadow-sm transition ${selectedRoomId === room.id ? 'border-emerald-500 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center gap-3 p-4">
              <button
                type="button"
                onClick={() => setSelectedRoomId(room.id)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white"
                aria-label={`Select room posted by ${owner.name}`}
              >
                {owner.photo}
              </button>
              <button type="button" onClick={() => setSelectedRoomId(room.id)} className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-black text-slate-950">{owner.name}</p>
                <p className="truncate text-xs font-semibold text-slate-500">
                  {owner.house} · {room.location}
                </p>
              </button>
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
              >
                {room.status}
              </span>
            </div>

            <button type="button" onClick={() => setSelectedRoomId(room.id)} className="block w-full text-left">
              <div className="grid aspect-[16/9] grid-cols-3 grid-rows-2 gap-1 bg-slate-100 sm:aspect-[2/1]">
                <img src={room.photos[1]} alt="" className="h-full w-full object-cover" />
                <img src={room.photos[0]} alt={room.title} className="col-span-2 row-span-2 h-full w-full object-cover" />
                <img src={room.photos[2]} alt="" className="h-full w-full object-cover" />
              </div>
            </button>

            <div className="p-4">
              <button type="button" onClick={() => setSelectedRoomId(room.id)} className="block w-full text-left">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-black leading-tight text-slate-950">{room.title}</h2>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">{currency.format(room.rent)} / month</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                    No broker fee
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {room.facilities.slice(0, 3).map((facility) => (
                    <span
                      key={facility}
                      className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </button>

              <div className="mt-4 grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-[1fr_1fr_auto]">
                <button
                  type="button"
                  onClick={() => openRoomPage(room.id)}
                  className="min-h-11 rounded-md bg-slate-950 px-4 text-sm font-black text-white hover:bg-slate-800"
                >
                  Room detail
                </button>
                <button
                  type="button"
                  disabled={room.status !== 'Available' || requested}
                  onClick={() => sendRequest(room.id)}
                  className="min-h-11 rounded-md bg-emerald-600 px-4 text-sm font-black text-white hover:bg-emerald-500 disabled:bg-slate-300"
                >
                  {requested ? 'Request sent' : 'Request room'}
                </button>
                <button
                  type="button"
                  onClick={() => toggleFavoriteRoom(room.id)}
                  className={`min-h-11 rounded-md border px-4 text-sm font-black ${isFavorite
                    ? 'border-amber-300 bg-amber-50 text-amber-800'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {isFavorite ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

function RoomDetail({
  room,
  owner,
  ownerListings,
  request,
  requestText,
  setRequestText,
  sendRequest,
  detailMode,
  setDetailMode,
  showOwnerDetails = true,
}) {
  const utility = room.usage * room.unitRate
  const total = room.rent + utility + room.waterBase + room.maintenance
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(room.location)}`
  const detailModes = [
    ['overview', 'Room'],
    ...(showOwnerDetails ? [['owner', 'Owner']] : []),
    ['location', 'Location'],
  ]
  const activeDetailMode = showOwnerDetails || detailMode !== 'owner' ? detailMode : 'overview'

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img src={room.photos[1] || room.photos[0]} alt="" className="h-40 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Selected room</p>
            <h2 className="mt-1 text-lg font-black leading-tight">{room.title}</h2>
          </div>
          <span
            className={`rounded-md px-2 py-1 text-xs font-bold ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}
          >
            {room.status}
          </span>
        </div>

        <div className={`mt-4 grid gap-2 ${showOwnerDetails ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {detailModes.map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              onClick={() => setDetailMode(mode)}
              className={`min-h-10 rounded-md border px-2 text-xs font-black ${activeDetailMode === mode
                ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeDetailMode === 'overview' && (
          <>
            <p className="mt-4 text-sm leading-6 text-slate-600">{room.description}</p>
            <dl className="mt-4 space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
              <ProfileLine label="Rent" value={currency.format(room.rent)} />
              <ProfileLine label="Deposit" value={currency.format(room.deposit)} />
              <ProfileLine label="Electricity" value={`${currency.format(room.unitRate)} / unit`} />
              <ProfileLine label="Monthly estimate" value={currency.format(total)} />
            </dl>
          </>
        )}

        {activeDetailMode === 'owner' && <OwnerDetails owner={owner} listings={ownerListings} />}

        {activeDetailMode === 'location' && <LocationDetails room={room} mapUrl={mapUrl} />}

        <label className="mt-4 block text-sm font-bold text-slate-800">
          Request note
          <textarea
            value={requestText}
            onChange={(event) => setRequestText(event.target.value)}
            className="mt-2 min-h-20 w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
          />
        </label>
        <button
          type="button"
          onClick={() => sendRequest(room.id)}
          disabled={room.status !== 'Available' || Boolean(request)}
          className="mt-3 min-h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white disabled:bg-slate-300"
        >
          {request ? `Request ${request.status}` : 'Send verified request'}
        </button>
      </div>
    </section>
  )
}

function OwnerDetails({ owner, listings }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-lg bg-slate-50 p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
            {owner.photo}
          </div>
          <div>
            <h3 className="font-black">{owner.name}</h3>
            <p className="text-sm text-slate-600">{owner.house}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">{owner.bio}</p>
        <dl className="mt-3 space-y-2 text-sm">
          <ProfileLine label="Contact" value={owner.contact} />
          <ProfileLine label="Property area" value={owner.propertyLocation} />
          <ProfileLine label="Response" value={owner.responseTime} />
          <ProfileLine label="Listings" value={`${listings.length} rooms`} />
        </dl>
      </div>
      <div>
        <h3 className="text-sm font-black">Owner listings</h3>
        <div className="mt-2 space-y-2">
          {listings.map((listing) => (
            <div key={listing.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-2">
              <img src={listing.photos[0]} alt="" className="h-12 w-14 rounded-md object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{listing.title}</p>
                <p className="text-xs text-slate-500">
                  {currency.format(listing.rent)} - {listing.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LocationDetails({ room, mapUrl }) {
  return (
    <div className="mt-4 space-y-3">
      <div className="rounded-lg bg-slate-950 p-4 text-white">
        <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Room location</p>
        <h3 className="mt-2 text-lg font-black">{room.location}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Simulated map preview for testing. In production, this button would open the exact verified property pin.
        </p>
        <div className="mt-4 grid h-32 place-items-center rounded-lg border border-white/15 bg-white/10 text-sm font-bold text-slate-200">
          {room.area} map preview
        </div>
      </div>
      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-black text-white"
      >
        Open map location
      </a>
    </div>
  )
}

function RoomDetailPage({ room, owner, ownerListings, request, requestText, setRequestText, sendRequest, onBack }) {
  const utility = room.usage * room.unitRate
  const total = room.rent + utility + room.waterBase + room.maintenance
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(room.location)}`

  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Back to feed
      </button>

      <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
          {room.photos.map((photo) => (
            <img key={photo} src={photo} alt="" className="h-44 w-full object-cover md:h-56" />
          ))}
        </div>
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Detailed room description</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">{room.title}</h2>
                <p className="mt-1 text-slate-600">{room.location}</p>
              </div>
              <span
                className={`rounded-md px-3 py-2 text-xs font-black ${room.status === 'Available' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
              >
                {room.status}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-700">{room.description}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {room.facilities.map((facility) => (
                <div key={facility} className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-800">
                  {facility}
                </div>
              ))}
            </div>

            <section className="mt-6 rounded-lg border border-slate-200 p-4">
              <h3 className="text-lg font-black">Location</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Area: {room.area}. The map opens a simulated searchable location for this prototype.
              </p>
              <div className="mt-4 grid h-48 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
                {room.location} map preview
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex min-h-11 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-black text-white"
              >
                View room location
              </a>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-lg font-black">Cost breakdown</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <ProfileLine label="Rent" value={currency.format(room.rent)} />
                <ProfileLine label="Deposit" value={currency.format(room.deposit)} />
                <ProfileLine label="Electricity rate" value={`${currency.format(room.unitRate)} / unit`} />
                <ProfileLine label="Current electricity" value={currency.format(utility)} />
                <ProfileLine label="Water" value={currency.format(room.waterBase)} />
                <ProfileLine label="Maintenance" value={currency.format(room.maintenance)} />
                <ProfileLine label="Monthly estimate" value={currency.format(total)} />
              </dl>
            </section>

            <OwnerDetails owner={owner} listings={ownerListings} />

            <section className="rounded-lg border border-slate-200 p-4">
              <label className="block text-sm font-bold text-slate-800">
                Request note
                <textarea
                  value={requestText}
                  onChange={(event) => setRequestText(event.target.value)}
                  className="mt-2 min-h-24 w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
                />
              </label>
              <button
                type="button"
                onClick={() => sendRequest(room.id)}
                disabled={room.status !== 'Available' || Boolean(request)}
                className="mt-3 min-h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white disabled:bg-slate-300"
              >
                {request ? `Request ${request.status}` : 'Send verified request'}
              </button>
            </section>
          </aside>
        </div>
      </article>
    </section>
  )
}

function ManageTenantPage({ room, owner, seeker, onBack, updateRoom, role, requests, chats, chatText, setChatText, sendChat, otpInput, setOtpInput, verifyOtp, notices, noticeText, setNoticeText, addNotice, payments, updateUsage, togglePaid, remind }) {
  const [isEditingRoom, setIsEditingRoom] = useState(false)
  const [roomDraft, setRoomDraft] = useState({
    rent: room.rent,
    unitRate: room.unitRate,
    waterBase: room.waterBase,
    maintenance: room.maintenance,
  })

  function saveRoomInfo() {
    updateRoom(room.id, {
      rent: Number(roomDraft.rent),
      unitRate: Number(roomDraft.unitRate),
      waterBase: Number(roomDraft.waterBase),
      maintenance: Number(roomDraft.maintenance),
    })
    setIsEditingRoom(false)
  }

  const payment = payments.find((item) => item.roomId === room.id) || { paid: false, reminded: false, month: 'Current month' }
  const utility = (room.usage || 0) * room.unitRate
  const total = room.rent + utility + room.waterBase + room.maintenance

  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Back to dashboard
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="space-y-5">
          <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Room Details</h2>
              {!isEditingRoom && role === 'owner' ? (
                <button
                  type="button"
                  onClick={() => setIsEditingRoom(true)}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                >
                  Edit info
                </button>
              ) : isEditingRoom ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRoomDraft({ rent: room.rent, unitRate: room.unitRate, waterBase: room.waterBase, maintenance: room.maintenance })
                      setIsEditingRoom(false)
                    }}
                    className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={saveRoomInfo}
                    className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Save
                  </button>
                </div>
              ) : null}
            </div>

            {isEditingRoom ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['rent', 'Rent price'],
                  ['unitRate', 'Electricity rate / unit'],
                  ['waterBase', 'Water base cost'],
                  ['maintenance', 'Maintenance'],
                ].map(([key, label]) => (
                  <label key={key} className="text-sm font-semibold text-slate-700">
                    {label}
                    <input
                      type="number"
                      value={roomDraft[key]}
                      onChange={(event) => setRoomDraft({ ...roomDraft, [key]: event.target.value })}
                      className="mt-1 min-h-10 w-full rounded-md border border-slate-200 px-3 text-sm"
                    />
                  </label>
                ))}
              </div>
            ) : (
              <>
                <div className="mt-4 flex gap-4">
                  <img src={room.photos[0]} alt="" className="h-24 w-32 rounded-lg object-cover" />
                  <div>
                    <h3 className="text-lg font-black">{room.title}</h3>
                    <p className="text-sm text-slate-600">{room.location}</p>
                    <p className="mt-2 text-sm font-bold text-emerald-700">{currency.format(room.rent)} / month</p>
                  </div>
                </div>
                <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-3">
                  <ProfileLine label="Deposit" value={currency.format(room.deposit)} />
                  <ProfileLine label="Electricity" value={`${currency.format(room.unitRate)} / unit`} />
                  <ProfileLine label="Water" value={currency.format(room.waterBase)} />
                  <ProfileLine label="Maintenance" value={currency.format(room.maintenance)} />
                  <ProfileLine label="Total Estimate" value={currency.format(total)} />
                </dl>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <h3 className="text-sm font-bold text-slate-900">Facilities</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {room.facilities.map((facility) => (
                      <span key={facility} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {role === 'owner' && (
                    <button
                      type="button"
                      onClick={() => remind(room.id)}
                      className="min-h-10 rounded-md border border-slate-200 px-4 text-sm font-bold text-slate-800 hover:bg-slate-50"
                    >
                      {payment.reminded ? 'Reminder sent' : 'Send reminder'}
                    </button>
                  )}
                </div>
              </>
            )}
          </article>
          {seeker && (
            <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-black">Tenant Profile</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white">
                  {seeker.photo}
                </div>
                <div>
                  <h3 className="text-lg font-black">{seeker.name}</h3>
                  <p className="text-sm text-slate-600">{seeker.occupation} · {seeker.contact}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <ProfileLine label="Hometown" value={seeker.hometown} />
                <ProfileLine label="Current address" value={seeker.currentAddress} />
                <ProfileLine label="Emergency" value={seeker.emergencyContact} />
              </dl>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="text-sm font-bold text-slate-900">Verified Documents</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    <span className="text-lg">📄</span> ID Front ({seeker.idFront})
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
                    <span className="text-lg">📄</span> ID Back ({seeker.idBack})
                  </div>
                </div>
              </div>
            </article>
          )}
          <PaymentTracker roomPayments={payments.filter((p) => p.roomId === room.id)} />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28">
          <RentalSpace
            role={role}
            room={room}
            requests={requests}
            chats={chats}
            chatText={chatText}
            setChatText={setChatText}
            sendChat={sendChat}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            verifyOtp={verifyOtp}
            notices={notices}
            noticeText={noticeText}
            setNoticeText={setNoticeText}
            addNotice={addNotice}
            payments={payments}
            updateUsage={updateUsage}
            togglePaid={togglePaid}
            remind={remind}
          />
        </aside>
      </div>
    </section>
  )
}

function SeekerDetailPage({ seeker, request, room, updateRequest, onBack }) {
  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Back to owner dashboard
      </button>

      <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white">
              {seeker.photo}
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">Seeker detail</p>
              <h2 className="mt-1 text-3xl font-black">{seeker.name}</h2>
              <p className="text-slate-600">{seeker.occupation}</p>
            </div>
          </div>
          <span className="rounded-md bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
            Verified seeker
          </span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="text-lg font-black">Personal and contact details</h3>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <ProfileLine label="Phone" value={seeker.contact} />
                <ProfileLine label="Email" value={seeker.email} />
                <ProfileLine label="Hometown" value={seeker.hometown} />
                <ProfileLine label="Current address" value={seeker.currentAddress} />
                <ProfileLine label="Emergency contact" value={seeker.emergencyContact} />
                <ProfileLine label="Move-in date" value={seeker.moveInDate} />
                <ProfileLine label="Budget" value={currency.format(seeker.budget)} />
                <ProfileLine label="ID front/back" value={`${seeker.idFront} / ${seeker.idBack}`} />
              </dl>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <h3 className="text-lg font-black">Request message</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{request.message}</p>
            </div>

            <div className="rounded-lg border border-slate-200 p-4">
              <h3 className="text-lg font-black">Requested room</h3>
              <div className="mt-3 flex gap-3">
                <img src={room.photos[0]} alt="" className="h-24 w-28 rounded-lg object-cover" />
                <div>
                  <p className="font-black">{room.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{room.location}</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{currency.format(room.rent)} / month</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-lg bg-slate-950 p-4 text-white">
              <h3 className="text-lg font-black">Review status</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <ProfileLine label="Request" value={request.status} />
                <ProfileLine label="Owner OTP" value={request.ownerOtpVerified ? 'Verified' : 'Waiting'} />
                <ProfileLine label="Seeker OTP" value={request.seekerOtpVerified ? 'Verified' : 'Waiting'} />
              </dl>
            </div>
            <button
              type="button"
              onClick={() => updateRequest(request.id, 'Accepted')}
              disabled={request.status !== 'Pending'}
              className="min-h-11 w-full rounded-md bg-emerald-600 px-4 text-sm font-black text-white disabled:bg-slate-300"
            >
              Accept seeker
            </button>
            <button
              type="button"
              onClick={() => updateRequest(request.id, 'Rejected')}
              disabled={request.status !== 'Pending'}
              className="min-h-11 w-full rounded-md bg-rose-600 px-4 text-sm font-black text-white disabled:bg-slate-300"
            >
              Reject seeker
            </button>
          </aside>
        </div>
      </article>
    </section>
  )
}

function OwnerDashboard({
  rooms,
  requests,
  seekers,
  setSelectedRoomId,
  updateRequest,
  addListing,
  listingDraft,
  setListingDraft,
  openSeekerPage,
  openManagePage,
}) {
  const [isListingModalOpen, setIsListingModalOpen] = useState(false)
  const ownerRequests = requests.filter((request) => rooms.some((room) => room.id === request.roomId))
  return (
    <WorkspacePanel
      eyebrow="Owner workspace"
      title="Manage requests and listings"
      description="Review verified seekers, accept or reject requests, and publish rooms with transparent utility rates."
    >
      <div className="grid gap-4">
        <section className="space-y-3">
          <h3 className="text-base font-black">Incoming requests</h3>
          {ownerRequests.map((request) => {
            const seeker = seekers.find((item) => item.id === request.seekerId)
            const room = rooms.find((item) => item.id === request.roomId)
            return (
              <div key={request.id} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="grid h-9 w-9 place-items-center rounded-md bg-slate-950 text-xs font-bold text-white">
                        {seeker.photo}
                      </div>
                      <div>
                        <p className="font-black">{seeker.name}</p>
                        <p className="text-sm text-slate-600">{seeker.occupation}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-800">{room.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{request.message}</p>
                    <p className="mt-2 text-xs font-bold text-emerald-700">ID front/back uploaded. Contact verified.</p>
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold">{request.status}</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => openSeekerPage(request.id)}
                    className="min-h-10 rounded-md border border-slate-200 px-3 text-sm font-bold"
                  >
                    Seeker detail
                  </button>
                  <button
                    type="button"
                    onClick={() => updateRequest(request.id, 'Accepted')}
                    disabled={request.status !== 'Pending'}
                    className="min-h-10 rounded-md bg-emerald-600 px-3 text-sm font-bold text-white disabled:bg-slate-300"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => updateRequest(request.id, 'Rejected')}
                    disabled={request.status !== 'Pending'}
                    className="min-h-10 rounded-md bg-rose-600 px-3 text-sm font-bold text-white disabled:bg-slate-300"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )
          })}
          <div className="flex items-center justify-between pt-3">
            <h3 className="text-base font-black">My listings</h3>
            <button
              type="button"
              onClick={() => setIsListingModalOpen(true)}
              className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Create listing
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {rooms.map((room) => {
              const tenant = room.seekerId ? seekers.find(s => s.id === room.seekerId) : null;
              return (
                <div
                  key={room.id}
                  className="rounded-lg border border-slate-200 bg-white p-3 text-left"
                >
                  <img src={room.photos[0]} alt="" className="h-28 w-full rounded-md object-cover" />
                  <p className="mt-3 font-black leading-tight">{room.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{currency.format(room.rent)} / month</p>
                  {tenant && (
                    <div className="mt-3 flex items-center gap-3 border-t border-slate-100 pt-3">
                      <div className="grid h-8 w-8 place-items-center rounded-md bg-slate-950 text-xs font-bold text-white">
                        {tenant.photo}
                      </div>
                      <p className="text-sm font-bold">Acquired by {tenant.name}</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => openManagePage(room.id)}
                    className="mt-3 min-h-10 w-full rounded-md bg-slate-100 text-sm font-bold text-slate-800 hover:bg-slate-200"
                  >
                    {tenant ? 'Manage tenant' : 'Manage room'}
                  </button>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      {isListingModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm sm:p-6">
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={() => setIsListingModalOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-md bg-slate-100 font-bold text-slate-600 hover:bg-slate-200"
            >
              ✕
            </button>
            <ListingForm
              draft={listingDraft}
              setDraft={setListingDraft}
              addListing={(e) => {
                addListing(e);
                setIsListingModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </WorkspacePanel>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-100 p-3 text-center">
      <p className="text-2xl font-black">{value}</p>
      <p className="mt-1 text-xs font-semibold leading-4 text-slate-600">{label}</p>
    </div>
  )
}

function ListingForm({ draft, setDraft, addListing }) {
  const photoCount = draft.photos.split('\n').filter((item) => item.trim()).length
  return (
    <form onSubmit={addListing} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">Create room listing</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <input
          value={draft.title}
          onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          placeholder="Title"
          className="min-h-11 rounded-md border border-slate-200 px-3 text-sm"
        />
        <input
          value={draft.location}
          onChange={(event) => setDraft({ ...draft, location: event.target.value })}
          placeholder="Location"
          className="min-h-11 rounded-md border border-slate-200 px-3 text-sm"
        />
        {[
          ['rent', 'Rent price'],
          ['deposit', 'Deposit'],
          ['unitRate', 'Electricity unit rate'],
          ['waterBase', 'Water base cost'],
          ['maintenance', 'Maintenance'],
        ].map(([key, label]) => (
          <label key={key} className="text-sm font-semibold text-slate-700">
            {label}
            <input
              type="number"
              value={draft[key]}
              onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
              className="mt-1 min-h-11 w-full rounded-md border border-slate-200 px-3 text-sm"
            />
          </label>
        ))}
      </div>
      <label className="mt-3 block text-sm font-semibold text-slate-700">
        Photo URLs, one per line. Minimum 4.
        <textarea
          value={draft.photos}
          onChange={(event) => setDraft({ ...draft, photos: event.target.value })}
          className="mt-1 min-h-28 w-full rounded-md border border-slate-200 p-3 text-sm"
          placeholder="https://images.unsplash.com/..."
        />
      </label>
      <button
        type="submit"
        disabled={photoCount < 4}
        className="mt-3 min-h-11 rounded-md bg-slate-950 px-4 text-sm font-bold text-white disabled:bg-slate-300"
      >
        Publish listing ({photoCount}/4 photos)
      </button>
    </form>
  )
}

function RentalSpace(props) {
  const {
    role,
    room,
    requests,
    chats,
    chatText,
    setChatText,
    sendChat,
    otpInput,
    setOtpInput,
    verifyOtp,
    notices,
    noticeText,
    setNoticeText,
    addNotice,
    payments,
    updateUsage,
    togglePaid,
    remind,
  } = props

  const roomRequest = requests.find(
    (request) => request.roomId === room.id && ['Accepted', 'Completed'].includes(request.status),
  )
  const payment = payments.find((item) => item.roomId === room.id) || { paid: false, reminded: false, month: 'Current month' }
  const utility = room.usage * room.unitRate
  const total = room.rent + utility + room.waterBase + room.maintenance

  if (!roomRequest) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-bold">Rental space</h2>
        <p className="mt-2 text-sm text-slate-600">Accept a request to unlock chat, OTP confirmation, notices, and expenses.</p>
      </section>
    )
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">Rental space</h2>
          <p className="text-sm text-slate-600">{roomRequest.status} flow for selected room</p>
        </div>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">OTP {demoOtp}</span>
      </div>

      <div className="mt-4 rounded-lg bg-slate-100 p-3">
        <p className="text-sm font-bold">Shared OTP confirmation</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
          <span>Owner: {roomRequest.ownerOtpVerified ? 'Verified' : 'Waiting'}</span>
          <span>Seeker: {roomRequest.seekerOtpVerified ? 'Verified' : 'Waiting'}</span>
        </div>
        {roomRequest.status === 'Completed' ? (
          <div className="mt-3 flex h-10 items-center justify-center rounded-md bg-emerald-100 text-sm font-black text-emerald-800">
            Tenant verified & active
          </div>
        ) : (role === 'owner' && roomRequest.ownerOtpVerified) || (role === 'seeker' && roomRequest.seekerOtpVerified) ? (
          <div className="mt-3 flex h-10 items-center justify-center rounded-md bg-slate-200 text-sm font-bold text-slate-700">
            Waiting for other party to verify
          </div>
        ) : (
          <div className="mt-3 flex gap-2">
            <input
              value={otpInput}
              onChange={(event) => setOtpInput(event.target.value)}
              placeholder="Enter OTP"
              className="min-h-10 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm"
            />
            <button
              type="button"
              onClick={() => verifyOtp(roomRequest.id)}
              className="min-h-10 rounded-md bg-slate-950 px-3 text-sm font-bold text-white"
            >
              Verify
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Chat</h3>
        <div className="mt-2 max-h-52 space-y-2 overflow-auto rounded-lg border border-slate-200 p-3">
          {(chats[roomRequest.id] || []).map((message, index) => (
            <div
              key={`${message.body}-${index}`}
              className={`rounded-md px-3 py-2 text-sm ${message.from === role ? 'ml-8 bg-emerald-600 text-white' : 'mr-8 bg-slate-100 text-slate-800'
                }`}
            >
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={chatText}
            onChange={(event) => setChatText(event.target.value)}
            placeholder="Message after acceptance"
            className="min-h-10 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm"
          />
          <button
            type="button"
            onClick={() => sendChat(roomRequest.id)}
            className="min-h-10 rounded-md bg-emerald-600 px-3 text-sm font-bold text-white"
          >
            Send
          </button>
        </div>
      </div>

      {roomRequest.status === 'Completed' && (
        <>
          <div className="mt-4">
            <h3 className="font-bold">Notices</h3>
            <div className="mt-2 space-y-2">
              {notices
                .filter((notice) => notice.roomId === room.id)
                .map((notice) => (
                  <p key={notice.id} className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-950">
                    {notice.text}
                  </p>
                ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input
                value={noticeText}
                onChange={(event) => setNoticeText(event.target.value)}
                placeholder="Post room notice"
                className="min-h-10 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm"
              />
              <button
                type="button"
                onClick={() => addNotice(room.id)}
                className="min-h-10 rounded-md bg-slate-950 px-3 text-sm font-bold text-white"
              >
                Post
              </button>
            </div>
          </div>


        </>
      )}
    </section>
  )
}

function MyRoomPage({ room, owner, onBack, role, requests, chats, chatText, setChatText, sendChat, otpInput, setOtpInput, verifyOtp, notices, noticeText, setNoticeText, addNotice, payments, updateUsage, togglePaid, remind }) {
  const payment = payments.find((item) => item.roomId === room.id) || { paid: false, reminded: false, month: 'Current month' }
  const utility = (room.usage || 0) * room.unitRate
  const total = room.rent + utility + room.waterBase + room.maintenance

  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Back to dashboard
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="space-y-5">
          {owner && (
            <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-black">Owner Details</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-lg bg-slate-950 text-lg font-black text-white">
                  {owner.photo}
                </div>
                <div>
                  <h3 className="text-lg font-black">{owner.name}</h3>
                  <p className="text-sm text-slate-600">{owner.contact}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <ProfileLine label="House" value={owner.house} />
                <ProfileLine label="Property" value={owner.propertyLocation} />
              </dl>
            </article>
          )}

          <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-black">My Room Details</h2>
            <div className="mt-4 flex gap-4">
              <img src={room.photos[0]} alt="" className="h-24 w-32 rounded-lg object-cover" />
              <div>
                <h3 className="text-lg font-black">{room.title}</h3>
                <p className="text-sm text-slate-600">{room.location}</p>
                <p className="mt-2 text-sm font-bold text-emerald-700">{currency.format(room.rent)} / month</p>
              </div>
            </div>
            <dl className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-3">
              <ProfileLine label="Deposit" value={currency.format(room.deposit)} />
              <ProfileLine label="Electricity" value={`${currency.format(room.unitRate)} / unit`} />
              <ProfileLine label="Water" value={currency.format(room.waterBase)} />
              <ProfileLine label="Maintenance" value={currency.format(room.maintenance)} />
              <ProfileLine label="Total Estimate" value={currency.format(total)} />
            </dl>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <h3 className="text-sm font-bold text-slate-900">Facilities</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {room.facilities.map((facility) => (
                  <span key={facility} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {facility}
                  </span>
                ))}
              </div>
            </div>

          </article>
          <PaymentTracker roomPayments={payments.filter((p) => p.roomId === room.id)} />
        </div>
        <aside className="space-y-4 lg:sticky lg:top-28">
          <RentalSpace
            role={role}
            room={room}
            requests={requests}
            chats={chats}
            chatText={chatText}
            setChatText={setChatText}
            sendChat={sendChat}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
            verifyOtp={verifyOtp}
            notices={notices}
            noticeText={noticeText}
            setNoticeText={setNoticeText}
            addNotice={addNotice}
            payments={payments}
            updateUsage={updateUsage}
            togglePaid={togglePaid}
            remind={remind}
          />
        </aside>
      </div>
    </section>
  )
}

function NoticesPage({ notices, noticeText, setNoticeText, addNotice, onBack }) {
  return (
    <section className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
      >
        Back to dashboard
      </button>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="text-xl font-black">All Notices</h2>
        <p className="mt-1 text-sm text-slate-600">Global announcements and messages from your active rentals.</p>

        <div className="mt-6 space-y-4">
          <div className="rounded-md border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
            <span className="font-bold">System:</span> Welcome to RoomFinder Kathmandu! Browse verified listings with no broker fees. All your active rentals and chats will appear in your dedicated tenant portal after owner approval.
          </div>
          {notices.map((notice) => (
            <div key={notice.id} className="rounded-md border border-slate-100 bg-slate-50 p-4 text-sm text-slate-800">
              <span className="font-bold capitalize text-slate-900">{notice.author}:</span> {notice.text}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2 border-t border-slate-100 pt-6">
          <input
            value={noticeText}
            onChange={(event) => setNoticeText(event.target.value)}
            placeholder="Write a new notice..."
            className="min-h-10 min-w-0 flex-1 rounded-md border border-slate-200 px-3 text-sm"
          />
          <button
            type="button"
            onClick={addNotice}
            className="min-h-10 rounded-md bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"
          >
            Post
          </button>
        </div>
      </div>
    </section>
  )
}

function PaymentTracker({ roomPayments }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-xl font-black">Payment History</h2>
      <div className="mt-6 relative border-l-2 border-slate-100 ml-3 space-y-8">
        {roomPayments.length > 0 ? (
          roomPayments.map((payment) => (
            <div key={payment.month} className="relative pl-6">
              <div
                className={`absolute left-0 top-1 -ml-[25px] h-4 w-4 rounded-full border-4 border-white ${payment.paid ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
              />
              <div>
                <h3 className="font-bold text-slate-900">{payment.month}</h3>
                <p className={`text-sm font-semibold ${payment.paid ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {payment.paid ? 'Paid' : 'Pending'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 ml-4">No payment history available.</p>
        )}
      </div>
    </article>
  )
}

export default App
