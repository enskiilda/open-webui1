import type { Handle } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const AVAILABLE_MODELS = [
	{
		id: 'demo-model',
		name: 'Demo Model (Frontend Only)',
		owned_by: 'open-webui',
		external: false,
		source: 'local',
		info: {
			meta: {
				capabilities: {
					vision: false,
					usage: false
				},
				description: 'This is a demo model. Backend is not available in this version.'
			}
		}
	}
];

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;

	// Intercept API calls and return mock responses
	if (url.pathname.startsWith('/api/')) {
		// Config endpoint
		if (url.pathname === '/api/config') {
			return json({
				status: true,
				name: 'Open WebUI',
				version: '0.6.40',
				default_locale: 'en-US',
				default_models: null,
				default_prompt_suggestions: [
					{ content: 'Welcome to Open WebUI', title: ['Welcome', 'Frontend only mode'] }
				],
				features: {
					auth: false,
					auth_trusted_header: false,
					enable_api_keys: false,
					enable_signup: false,
					enable_login_form: false,
					enable_web_search: false,
					enable_google_drive_integration: false,
					enable_onedrive_integration: false,
					enable_image_generation: false,
					enable_admin_export: false,
					enable_admin_chat_access: false,
					enable_community_sharing: false,
					enable_autocomplete_generation: false,
					enable_direct_connections: false,
					enable_version_update_check: false
				},
				oauth: {
					providers: {}
				}
			});
		}

		// Models endpoints
		if (url.pathname === '/api/models' || url.pathname === '/api/v1/models') {
			return json({ data: AVAILABLE_MODELS });
		}

		// Chat endpoints
		if (url.pathname === '/api/v1/chats' || url.pathname === '/api/v1/chats/list') {
			return json([]);
		}

		if (url.pathname === '/api/v1/chats/all/tags') {
			return json([]);
		}

		if (url.pathname === '/api/v1/chats/pinned') {
			return json([]);
		}

		if (url.pathname.match(/^\/api\/v1\/chats\/[^/]+$/) && request.method === 'GET') {
			return json({ error: 'Chat not found' }, { status: 404 });
		}

		if (url.pathname === '/api/v1/chats/new' && request.method === 'POST') {
			return json({ success: true, id: 'local' });
		}

		if (url.pathname.match(/^\/api\/v1\/chats\/[^/]+$/) && request.method === 'POST') {
			return json({ success: true });
		}

		if (url.pathname.match(/^\/api\/v1\/chats\/[^/]+$/) && request.method === 'DELETE') {
			return json({ success: true });
		}

		// Folders endpoint
		if (url.pathname === '/api/v1/folders') {
			return json([]);
		}

		if (url.pathname === '/api/v1/folders' && request.method === 'POST') {
			return json({ success: true });
		}

		// Tools endpoint
		if (url.pathname === '/api/v1/tools') {
			return json([]);
		}

		// Functions endpoint
		if (url.pathname === '/api/v1/functions') {
			return json([]);
		}

		// Channels endpoint
		if (url.pathname === '/api/v1/channels') {
			return json([]);
		}

		// Banners endpoint
		if (url.pathname === '/api/v1/banners' || url.pathname === '/api/v1/configs/banners') {
			return json([]);
		}

		// Task config
		if (url.pathname === '/api/v1/tasks/config') {
			return json({
				TASK_MODEL: null,
				TITLE_GENERATION_PROMPT_TEMPLATE: '',
				ENABLE_AUTOCOMPLETE_GENERATION: false
			});
		}

		// Pipelines
		if (url.pathname === '/api/v1/pipelines' || url.pathname === '/api/v1/pipelines/list') {
			return json({ data: [] });
		}

		// Users/auth endpoints (return empty/disabled for no-auth mode)
		if (url.pathname === '/api/v1/users/me') {
			return json({
				id: 'local-user',
				name: 'Local User',
				email: 'local@open-webui',
				role: 'user',
				profile_image_url: null
			});
		}

		// Files/knowledge endpoints
		if (url.pathname.startsWith('/api/v1/files') || url.pathname.startsWith('/api/v1/knowledge')) {
			return json([]);
		}

		// Memories endpoint
		if (url.pathname.startsWith('/api/v1/memories')) {
			return json([]);
		}

		// Prompts endpoint
		if (url.pathname.startsWith('/api/v1/prompts')) {
			return json([]);
		}

		// Audio endpoint
		if (url.pathname.startsWith('/api/v1/audio')) {
			return json({ error: 'Audio not available in frontend-only mode' }, { status: 501 });
		}

		// Images endpoint
		if (url.pathname.startsWith('/api/v1/images')) {
			return json({ error: 'Image generation not available in frontend-only mode' }, { status: 501 });
		}

		// Retrieval endpoint
		if (url.pathname.startsWith('/api/v1/retrieval')) {
			return json({ error: 'Retrieval not available in frontend-only mode' }, { status: 501 });
		}

		// Groups endpoint
		if (url.pathname.startsWith('/api/v1/groups')) {
			return json([]);
		}

		// Evaluations endpoint
		if (url.pathname.startsWith('/api/v1/evaluations')) {
			return json([]);
		}

		// Notes endpoint
		if (url.pathname.startsWith('/api/v1/notes')) {
			return json([]);
		}

		// Configs endpoints
		if (url.pathname.startsWith('/api/v1/configs')) {
			if (request.method === 'GET') {
				return json({});
			} else {
				return json({ success: true });
			}
		}

		// Chat completions - return error as this requires actual LLM
		if (url.pathname === '/api/chat/completions') {
			return json(
				{
					error: 'Chat completions not available in frontend-only mode. Please connect to an external API.'
				},
				{ status: 501 }
			);
		}

		// Default fallback for unhandled API endpoints
		console.log('Unhandled API endpoint:', url.pathname);
		return json({ error: 'Not implemented in frontend-only mode' }, { status: 501 });
	}

	// Health check
	if (url.pathname === '/health') {
		return json({
			status: 'ok',
			version: '0.6.40-frontend-only'
		});
	}

	// For all other requests, proceed with normal SvelteKit handling
	return resolve(event);
};
