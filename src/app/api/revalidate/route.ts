import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Verify Sanity Webhook Secret (optional but highly recommended for security)
        const signature = req.headers.get('sanity-webhook-signature');
        if (!signature) {
            console.warn('Webhook executed without signature');
            // In production, you would validate this signature against a secret.
            // For now, we will allow it to proceed for simplicity, or we can enforce it.
        }

        // Determine what to revalidate based on the document type
        const type = body._type;
        const slug = body.slug?.current;

        console.log(`[Webhook] Revalidating type: ${type}, slug: ${slug}`);

        // Revalidate the home page which lists all documents
        revalidatePath('/');

        // Also revalidate specific dynamic routes if applicable
        if (type === 'property' && slug) {
            revalidatePath(`/property/${slug}`);
        } else if (type === 'post' && slug) {
            revalidatePath(`/post/${slug}`);
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (err: any) {
        console.error('[Webhook Error]', err);
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
