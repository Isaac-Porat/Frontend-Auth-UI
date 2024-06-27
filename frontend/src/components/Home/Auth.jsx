import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(8, {
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: null, message: null });
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginUser = async (formData) => {
    setIsLoading(true);
    setResponse({ type: null, message: null });

    const formBody = new FormData();
    formBody.append('username', formData.username);
    formBody.append('password', formData.password);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formBody,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      setResponse({ type: 'success', message: 'Login successful. Welcome back!' });
      console.log('Login successful:', result);

      const accessToken = result["access_token"]
      localStorage.setItem('accessToken', accessToken);

      navigate('/');

    } catch (error) {
      setResponse({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (formData) => {
    setIsLoading(true);
    setResponse({ type: null, message: null });

    const formBody = new FormData();
    formBody.append('username', formData.username);
    formBody.append('password', formData.password);

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formBody,
      });

      if (!response.ok) {
        if (response.status === 400) {
          setResponse({ type: 'error', message: 'Username already exists' });
        } else {
          throw new Error('Registration failed');
        }
      } else {
        const result = await response.json();
        setResponse({ type: 'success', message: 'Registration successful. Your account has been created.' });
        console.log('Registration successful:', result);

        const accessToken = result["access_token"]
        localStorage.setItem('accessToken', accessToken);

        navigate('/');
      }

    } catch (error) {
      setResponse({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data) => {
    if (activeTab === 'login') {
      loginUser(data);
    } else {
      registerUser(data);
    }
  };

  const AuthForm = ({ action }) => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {response.type && (
          <FormMessage className={response.type === 'error' ? 'text-red-500' : 'text-green-500'}>
            {response.message}
          </FormMessage>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Processing...' : (action === 'login' ? 'Log In' : 'Sign Up')}
        </Button>
      </form>
    </Form>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Login or create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <AuthForm action="login" />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm action="signup" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;