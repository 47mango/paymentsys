"use client"

import { AspectRatio, Button, Card, Grid, Heading } from "@radix-ui/themes"
import Image from "next/image"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/images/loginBg.png"
        alt="login background"
        fill
        className="object-cover pointer-events-none select-none"
        priority
        unoptimized
        draggable={false}
      />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="w-full max-w-md border-2 border-white rounded-lg p-4 bg-white">
          <Grid gap="4" p="4">
            <Heading align="center">
              <AspectRatio ratio={4 / 1}>
                <Image
                  src="/images/reDmuLogo.png"
                  alt="logo"
                  width={400}
                  height={100}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  priority
                  unoptimized
                  draggable={false}
                />
              </AspectRatio>
            </Heading>

            <div className="text-center text-black font-bold">구글 로그인으로 시작하세요</div>

            <Grid gap="2" className="justify-items-center">
              <Button
                onClick={handleGoogleLogin}
                size="3"
                className="w-full"
              >
                Google로 로그인
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}
