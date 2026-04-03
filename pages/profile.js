import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import { userAPI } from '../lib/api'

export default function Profile() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    bio: '',
    profilePicture: '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile(user.id)
        setProfile(response.data)
        setFormData({
          bio: response.data.bio,
          profilePicture: response.data.profilePicture,
        })
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, router])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userAPI.updateProfile(formData)
      setProfile({ ...profile, ...formData })
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-indigo-600">
            SocialEarn
          </Link>
          <div className="space-x-4">
            <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 font-semibold">
              Dashboard
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

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <img
              src={profile.profilePicture}
              alt={profile.username}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">{profile.username}</h1>
            <p className="text-gray-600">{profile.email}</p>
          </div>

          {!editing ? (
            <>
              {/* Profile Info */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-600 font-semibold">Bio</label>
                    <p className="text-gray-800">{profile.bio || 'No bio added yet'}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold">Country</label>
                    <p className="text-gray-800">{profile.country}</p>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold">Member Since</label>
                    <p className="text-gray-800">{new Date(profile.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded">
                  <p className="text-gray-600">Token Balance</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.tokenBalance}</p>
                </div>
                <div className="bg-pink-50 p-4 rounded">
                  <p className="text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-pink-600">{profile.totalEarnings}</p>
                </div>
              </div>

              <button
                onClick={() => setEditing(true)}
                className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="Tell us about yourself"
                  rows="4"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-600 font-semibold mb-2">Profile Picture URL</label>
                <input
                  type="url"
                  name="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
                  placeholder="https://..."
                />
              </div>

              <div className="space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
