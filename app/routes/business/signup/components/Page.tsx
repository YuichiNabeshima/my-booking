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
  const isLoading = navigation.formAction === '/business/signup/';

  const [form, field] = useForm({
    lastResult: actionResult?.lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const submitFailed = actionResult?.status === STATUS.FAILED;

  const emailErrors = field[FORM_NAME.EMAIL].errors;
  const passwordErrors = field[FORM_NAME.PASSWORD].errors;
  const passwordConfirmErrors = field[FORM_NAME.PASSWORD_CONFIRM].errors;
  const nameErrors = field[FORM_NAME.NAME].errors;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Utensils className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Sign up to start managing your restaurant reservations
          </CardDescription>
        </CardHeader>
        <Form method="post" {...getFormProps(form)}>
          <CardContent className="mb-2">
            {submitFailed && (
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
              {emailErrors && <p className="text-sm text-red-500">{emailErrors}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                placeholder="Create a password"
                required
                {...getInputProps(field[FORM_NAME.PASSWORD], { type: 'password' })}
              />
              {passwordErrors && <p className="text-sm text-red-500">{passwordErrors}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                placeholder="Confirm your password"
                required
                {...getInputProps(field[FORM_NAME.PASSWORD_CONFIRM], { type: 'password' })}
              />
              {passwordConfirmErrors && (
                <p className="text-sm text-red-500">{passwordConfirmErrors}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input
                placeholder="Enter your restaurant name"
                required
                {...getInputProps(field[FORM_NAME.NAME], { type: 'text' })}
              />
              {nameErrors && <p className="text-sm text-red-500">{nameErrors}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
            <p className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link to="/business/login/" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
