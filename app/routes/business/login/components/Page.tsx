import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Loader2, Utensils } from 'lucide-react';
import { Form, Link, useActionData, useNavigation } from 'react-router';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { STATUS } from '~/constants/STATUS';

import { FORM_NAME } from '../constants/FORM_NAME';
import type { action } from '../route';
import { schema } from '../schemas/schema';

export function Page() {
  const actionResult = useActionData<typeof action>();

  const navigation = useNavigation();
  const isLoading = navigation.formAction === '/business/login/';

  const [form, field] = useForm({
    lastResult: actionResult?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const globalError = actionResult?.status === STATUS.FAILED;
  const emailError = field[FORM_NAME.EMAIL].errors;
  const passwordError = field[FORM_NAME.PASSWORD].errors;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Utensils className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Restaurant Admin</CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your reservations
          </CardDescription>
        </CardHeader>
        <Form method="post" {...getFormProps(form)}>
          <CardContent>
            {globalError && (
              <p className="text-sm text-red-500">The email address or password is incorrect.</p>
            )}
          </CardContent>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                placeholder="your@email.com"
                required
                {...getInputProps(field[FORM_NAME.EMAIL], { type: 'email' })}
              />
              {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Enter your password"
                required
                {...getInputProps(field[FORM_NAME.PASSWORD], { type: 'password' })}
              />
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
            <p className="text-sm text-center text-gray-500">
              Don't have an account?{' '}
              <Link to="/business/signup/" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
