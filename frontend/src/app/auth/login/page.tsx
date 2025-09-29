"use client"
import { AspectRatio, Button, Card, Grid, Heading, Link } from "@radix-ui/themes"
import React from "react"
import { signIn } from "next-auth/react"

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
                    <img src="/image/DMULogo.jpg" alt="logo" className="w-full h-full object-contain" />
                </AspectRatio>
            </Heading>
            <Grid gap="2" className="justify-items-center">
                <Button 
                  onClick={handleGoogleLogin}
                  size="3"
                  className="w-full"
                >
                  Google로 로그인
                </Button>
                <Link href="/auth/singUp">회원가입</Link>
            </Grid>
        </Grid>
      </Card>
    </div>
  )
}