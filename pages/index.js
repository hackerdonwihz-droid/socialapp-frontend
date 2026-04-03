import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  if (user) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-pink-500">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">SocialEarn</h1>
          <div className="space-x-4">
            <Link href="/auth/login" className="px-4 py-2 text-indigo-600 font-semibold hover:bg-gray-100 rounded">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 text-center text-white">
        <h2 className="text-5xl font-bold mb-6">Earn While You Scroll</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of Nigerians making money by using our platform. Earn tokens, 
          upload videos, gift creators, and withdraw to your Opay account.
        </p>
        <div className="space-x-4">
          <Link href="/auth/signup" className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100">
            Get Started Now
          </Link>
          <button className="inline-block px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-indigo-600">
            Learn More
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Use the App</h4>
              <p className="text-gray-600">Use the platform for at least 12 hours daily to earn tokens</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Upload Videos</h4>
              <p className="text-gray-600">Upload videos and set your own price for viewers to watch</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Earn & Withdraw</h4>
              <p className="text-gray-600">Withdraw your earnings directly to your Opay account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
