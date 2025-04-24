import { useEffect, useState } from 'react';
import { useActionData, useLoaderData } from 'react-router';

import { ERROR_MESSAGES } from '../constants/ERROR_MESSAGES';
import { STATUS } from '../constants/STATUS';
import type { action, loader } from '../route';

export function usePage() {
  const data = useLoaderData<typeof loader>();
  const result = useActionData<typeof action>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showEmailContent, setShowEmailContent] = useState<boolean>(false);
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');

  useEffect(() => {
    if (data?.status === STATUS.TOKEN_EXPIRED) {
      setError(ERROR_MESSAGES.TOKEN_EXPIRED);
      return;
    }

    if (data?.status === STATUS.FAILED) {
      setError(ERROR_MESSAGES.FAILED);
      return;
    }
  }, [data]);

  useEffect(() => {
    if (result?.status === STATUS.SUCCESS) {
      setSuccess(true);
      setEmailSubject(result.mail?.subject ?? '');
      setEmailBody(result.mail?.body ?? '');
      return;
    }

    if (result?.status === STATUS.TOKEN_EXPIRED) {
      setError(ERROR_MESSAGES.TOKEN_EXPIRED);
      return;
    }

    if (result?.status === STATUS.FAILED) {
      setError(ERROR_MESSAGES.FAILED);
      return;
    }
  }, [result]);

  const isTokenExpired =
    data?.status === STATUS.TOKEN_EXPIRED || result?.status === STATUS.TOKEN_EXPIRED;

  const isFailed = data?.status === STATUS.FAILED || result?.status === STATUS.FAILED;

  const handleViewEmailContent = () => {
    setShowEmailContent(true);
  };

  const handleCloseEmailContent = () => {
    setShowEmailContent(false);
  };

  return {
    error,
    success,
    showEmailContent,
    isTokenExpired,
    isFailed,
    handleViewEmailContent,
    handleCloseEmailContent,
    emailSubject,
    emailBody,
  };
}
