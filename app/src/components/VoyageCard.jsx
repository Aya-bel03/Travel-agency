import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Landmark, Globe, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { createReservation, getCurrentUser } from '../services/api';

const VoyageCard = ({ voyage, onReserve }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nbPersonnes, setNbPersonnes] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const isLocal = voyage.type === 'local';
  const user = getCurrentUser();

  // Formater le prix en DZD
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-DZ', {
      style: 'currency',
      currency: 'DZD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Calculer la durée du voyage
  const calculateDuration = () => {
    const depart = new Date(voyage.date_depart);
    const retour = new Date(voyage.date_retour);
    const diffTime = Math.abs(retour - depart);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleReservation = async () => {
    if (!user) {
      toast.error('Veuillez vous connecter pour réserver');
      return;
    }

    if (nbPersonnes < 1) {
      toast.error('Le nombre de personnes doit être au moins 1');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createReservation({
        user_id: user.id,
        voyage_id: voyage.id,
        nb_personnes: nbPersonnes,
      });

      if (response.success) {
        toast.success('Réservation effectuée avec succès !');
        setIsDialogOpen(false);
        if (onReserve) onReserve();
      }
    } catch (error) {
      toast.error(error.error || 'Erreur lors de la réservation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={voyage.image}
          alt={voyage.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type Badge */}
        <Badge
          className={`absolute top-4 left-4 ${
            isLocal
              ? 'bg-emerald-500 hover:bg-emerald-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white border-0`}
        >
          {isLocal ? (
            <>
              <Landmark className="h-3 w-3 mr-1" />
              Local
            </>
          ) : (
            <>
              <Globe className="h-3 w-3 mr-1" />
              International
            </>
          )}
        </Badge>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <span className="text-2xl font-bold text-emerald-600">
            {formatPrice(voyage.prix)}
          </span>
          <span className="text-gray-500 text-sm">/personne</span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {voyage.destination}
            </h3>
            {isLocal && voyage.wilaya && (
              <div className="flex items-center text-gray-500 mt-1">
                <MapPin className="h-4 w-4 mr-1 text-emerald-500" />
                <span className="text-sm">Wilaya de {voyage.wilaya}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Dates */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-emerald-500" />
            <span>{formatDate(voyage.date_depart)}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-emerald-500" />
            <span>{formatDate(voyage.date_retour)}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="text-sm text-gray-500">
          Durée: <span className="font-medium text-gray-700">{calculateDuration()} jours</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {voyage.description}
        </p>

        {/* Reserve Button */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3"
            >
              Réserver Maintenant
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Réserver ce voyage</DialogTitle>
              <DialogDescription>
                {voyage.destination} - {formatPrice(voyage.prix)}/personne
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Voyage Summary */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                  <span className="text-gray-600">
                    Du {formatDate(voyage.date_depart)} au {formatDate(voyage.date_retour)}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  <span className="text-gray-600">
                    {isLocal ? `Wilaya de ${voyage.wilaya}` : voyage.destination}
                  </span>
                </div>
              </div>

              {/* Number of People */}
              <div className="space-y-2">
                <Label htmlFor="nb-personnes" className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-emerald-500" />
                  Nombre de personnes
                </Label>
                <Input
                  id="nb-personnes"
                  type="number"
                  min="1"
                  max="10"
                  value={nbPersonnes}
                  onChange={(e) => setNbPersonnes(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
              </div>

              {/* Total Price */}
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prix total:</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatPrice(voyage.prix * nbPersonnes)}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
              <Button
                onClick={handleReservation}
                disabled={isLoading}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Traitement...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" />
                    Confirmer la réservation
                  </span>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default VoyageCard;
