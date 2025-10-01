"use client"
import { AspectRatio, Button, Card, Grid, Heading, Link } from "@radix-ui/themes"
import React from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function LoginPage() {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };
    
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <Grid gap="4" p="4">
            <Heading align="center">
                <AspectRatio ratio={4/1}>
                    <Image 
                        src="/images/dmuLogo.jpg" 
                        alt="logo" 
                        width={400}
                        height={100}
                        className="w-full h-full object-contain pointer-events-none"
                        priority
                        unoptimized
                        draggable={false}
                    />
                </AspectRatio>
            </Heading>
            <Heading align="center">구글 로그인으로 시작하세요</Heading>
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
      </Card>
    </div>
  )
}