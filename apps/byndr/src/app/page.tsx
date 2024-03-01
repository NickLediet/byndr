"use client"
import { AppHeader, Button, Toaster } from '@byndr/ui';
import { toast } from "sonner";

const handletoast = () => toast('The event has been created', {
  dismissible: true,
  description: 'YOYOYOYOO',
  closeButton: true
})
export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */

  return (
    <div className="w-full">
      <AppHeader>
        <Button className="bg-orange-500" onClick={handletoast}>Hello World</Button>
      </AppHeader>
      <main className="px-6 container">
        Hello World!

      </main>
        <Toaster></Toaster>
    </div>
  );
}
