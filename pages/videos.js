import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../lib/auth'
import { videoAPI } from '../lib/api'

export default function Videos() {
  const router = useRouter()
  const { user } = useAuth()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    const fetchVideos = async () => {
      try {
        const response = await videoAPI.getAllVideos()
        setVideos(response.data)
      } catch (error) {
        console.error('Failed to fetch videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [user, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold">Loading videos...</div>
      </div>
    )
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
            <Link href="/upload-video" className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold">
              Upload Video
            </Link>
          </div>
        </div>
      </nav>

      {/* Videos Grid */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Discover Videos</h1>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-600">No videos yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Link key={video._id} href={`/video/${video._id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                  {video.thumbnailUrl && (
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{video.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-indigo-600 font-bold">{video.price} tokens</p>
                      <p className="text-gray-500 text-sm">{video.views} views</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
