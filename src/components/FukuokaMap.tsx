'use client';

import React, { useState } from 'react';
import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '1rem'
};

const center = {
    lat: 33.5902, // Fukuoka city center typical lat
    lng: 130.4017 // typical lng
};

export default function FukuokaMap({ properties, highSchools }: { properties: any[], highSchools: any[] }) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
    });

    const [selectedProperty, setSelectedProperty] = useState<any>(null);
    const [selectedSchool, setSelectedSchool] = useState<any>(null);

    if (!apiKey) {
        return (
            <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <p className="text-lg font-bold">地図の読み込み準備中</p>
                <p className="text-sm mt-2">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY が設定されていません。</p>
            </div>
        );
    }

    if (loadError) return <div>地図の読み込みに失敗しました</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={{ disableDefaultUI: true, zoomControl: true }}
            >
                {properties?.map(prop => {
                    if (!prop.geopoint) return null;
                    return (
                        <MarkerF
                            key={prop._id}
                            position={{ lat: prop.geopoint.lat, lng: prop.geopoint.lng }}
                            icon={{
                                url: "http://maps.google.com/mapfiles/ms/icons/red-pushpin.png"
                            }}
                            onClick={() => {
                                setSelectedProperty(prop);
                                setSelectedSchool(null);
                            }}
                        />
                    );
                })}

                {highSchools?.map(school => {
                    if (!school.location) return null;
                    return (
                        <MarkerF
                            key={school._id}
                            position={{ lat: school.location.lat, lng: school.location.lng }}
                            icon={{
                                url: "https://maps.google.com/mapfiles/kml/shapes/schools.png",
                                scaledSize: new window.google.maps.Size(32, 32)
                            }}
                            onClick={() => {
                                setSelectedSchool(school);
                                setSelectedProperty(null);
                            }}
                        />
                    );
                })}

                {selectedProperty && selectedProperty.geopoint && (
                    <InfoWindowF
                        position={{ lat: selectedProperty.geopoint.lat, lng: selectedProperty.geopoint.lng }}
                        onCloseClick={() => setSelectedProperty(null)}
                    >
                        <div className="p-2 max-w-[200px]">
                            <h3 className="font-bold text-navy-900 mb-1">{selectedProperty.title}</h3>
                            <p className="text-xs text-orange-500 font-bold mb-2">おすすめ物件</p>
                            {selectedProperty.price && <p className="text-sm">¥{selectedProperty.price.toLocaleString()}</p>}
                        </div>
                    </InfoWindowF>
                )}

                {selectedSchool && selectedSchool.location && (
                    <InfoWindowF
                        position={{ lat: selectedSchool.location.lat, lng: selectedSchool.location.lng }}
                        onCloseClick={() => setSelectedSchool(null)}
                    >
                        <div className="p-2 max-w-[200px]">
                            <h3 className="font-bold text-navy-900 mb-1">{selectedSchool.name}</h3>
                            <p className="text-xs text-blue-500 font-bold mb-2">高校</p>
                            {selectedSchool.description && <p className="text-xs text-gray-600 line-clamp-3">{selectedSchool.description}</p>}
                        </div>
                    </InfoWindowF>
                )}
            </GoogleMap>
        </div>
    );
}
