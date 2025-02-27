import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/libs/nodemail";

export async function GET(request: Request) {

    return new NextResponse(JSON.stringify({ msg: 'reply contact email' }))
}


export async function POST(request: NextRequest) {
    const res = await request.json();
    const { email, name, message, urlPath } = res;

    // save request to db
    

    // send email
    try {
        const send = await sendEmail({
            from: 'dat198hp@gmail.com',
            to: email,
            subject: "Contact from product shop",
            text: "You have new contact",
            html: `
            <p>You have new request from product shop</p>
            <p> From : ${email}</p>
            <p> Name : ${name}</p>
            <p> Message : ${message}</p>
            <a>${urlPath}</a>
        `,
        });
        console.log("Send email to : ", email, "res : ", send)
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({ status: 200, msg: 'Request success' });
}