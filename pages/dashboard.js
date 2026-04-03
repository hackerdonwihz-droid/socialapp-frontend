import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import { userAPI } from '../lib/api'

export default function Dashboard() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const [stats, setStats] = useState(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await userAPI.getStats()
        setStats(response.data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }

    if (user) {
      fetchStats()
    }
  }, [user])

  if (loading || loadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-indigo-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">SocialEarn</h1>
          <div className="space-x-4 flex items-center">
            <Link href="/profile" className="text-gray-700 hover:text-indigo-600 font-semibold">
              Profile
            </Link>
            <Link href="/videos" className="text-gray-700 hover:text-indigo-600 font-semibold">
              Videos
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {user.username}! 👋</h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Token Balance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Token Balance</h3>
            <p className="text-4xl font-bold text-indigo-600">
              {stats?.tokenBalance || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">Available tokens</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Total Earnings</h3>
            <p className="text-4xl font-bold text-pink-600">
              {stats?.totalEarnings || 0}
            </p>
            <p className="text-sm text-gray-500 mt-2">All-time earnings</p>
          </div>

          {/* Daily Hours */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Daily Hours</h3>
            <p className="text-4xl font-bold text-green-600">
              {stats?.dailyHoursTracked || 0}h
            </p>
            <p className="text-sm text-gray-500 mt-2">Hours tracked today</p>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 font-semibold mb-2">Verification</h3>
            <p className={`text-4xl font-bold ${stats?.isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
              {stats?.isVerified ? '✓' : '⏳'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {stats?.isVerified ? 'Verified' : 'Pending'}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/upload-video"
              className="bg-indigo-600 text-white font-bold py-3 rounded-lg text-center hover:bg-indigo-700 transition"
            >
              📹 Upload Video
            </Link>
            <Link
              href="/time-tracking"
              className="bg-green-600 text-white font-bold py-3 rounded-lg text-center hover:bg-green-700 transition"
            >
              ⏱️ Track Time
            </Link>
            <Link
              href="/withdraw"
              className="bg-pink-600 text-white font-bold py-3 rounded-lg text-center hover:bg-pink-700 transition"
            >
              💰 Withdraw
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
