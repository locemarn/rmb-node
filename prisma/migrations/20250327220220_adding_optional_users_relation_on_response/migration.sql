-- AddForeignKey
ALTER TABLE "response" ADD CONSTRAINT "response_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
