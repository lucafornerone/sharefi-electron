/**
 * A interface that represent download request
 * 
 * @requires Subscription
 */

// Npm modules
import { Subscription } from 'rxjs';

export interface DownloadSubscription {
	name: string,
	id: number | null, // Used for files
	zipId: string | null, // Used for folders
	from: string,
	subscription: Subscription
}