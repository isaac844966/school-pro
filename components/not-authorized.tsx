"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LockIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotAuthorizedCard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-red-500 p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
            >
              <LockIcon className="w-16 h-16 mx-auto text-white" />
            </motion.div>
            <CardTitle className="mt-4 text-2xl font-bold text-white">Not Authorized</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 text-center">
              Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex justify-center">
            <Button
              variant="outline"
              className="transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-white"
            >
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

